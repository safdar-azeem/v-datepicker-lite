<script setup lang="ts">
import { computed, ref, shallowRef, onMounted, watch, nextTick } from 'vue'
import type { MonthData } from '../types'
import { datePickerGetMonthsData } from '../utils'

interface Props {
   currentDate: Date
   selectedDate: Date | null
}

interface Emits {
   (e: 'select', year: number): void
   (e: 'month-select', month: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentYear = computed(() => props.currentDate.getFullYear())
const selectedYear = computed(() => props.selectedDate?.getFullYear())

const years = shallowRef<number[]>([])
const yearsListRef = ref<HTMLElement | null>(null)
const isUpdatingScroll = ref(false)

const initYears = () => {
   const target = selectedYear.value || currentYear.value
   const start = target - 40
   years.value = Array.from({ length: 50 }, (_, i) => start + i)
}

onMounted(() => {
   initYears()
   scrollToTarget(false)
})

watch(
   () => props.currentDate,
   (newDate, oldDate) => {
      if (newDate.getFullYear() !== oldDate.getFullYear()) {
         const target = newDate.getFullYear()
         if (!years.value.includes(target) || years.value.indexOf(target) < 10 || years.value.indexOf(target) > years.value.length - 10) {
            initYears()
         }
         scrollToTarget(true)
      }
   }
)

const scrollToTarget = (smooth = false) => {
   nextTick(() => {
      setTimeout(() => {
         if (!yearsListRef.value) return
         const targetEl = yearsListRef.value.querySelector('.year-item.selected') || 
                          yearsListRef.value.querySelector('.year-item.current')
         if (targetEl) {
            targetEl.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' })
         }
      }, 50)
   })
}

const handleScroll = async (e: Event) => {
   const target = e.target as HTMLElement
   if (!target || isUpdatingScroll.value) return

   if (target.scrollTop === 0) {
      isUpdatingScroll.value = true
      // Reached top, prepend 20 past years
      const firstYear = years.value[0]
      const newYears = Array.from({ length: 20 }, (_, i) => firstYear - 20 + i)
      
      const oldScrollHeight = target.scrollHeight
      years.value = [...newYears, ...years.value]
      
      await nextTick()
      const newScrollHeight = target.scrollHeight
      target.scrollTop = newScrollHeight - oldScrollHeight
      
      setTimeout(() => { isUpdatingScroll.value = false }, 50)
   } else if (target.scrollTop + target.clientHeight >= target.scrollHeight - 5) {
      isUpdatingScroll.value = true
      // Reached bottom, append 10 future years
      const lastYear = years.value[years.value.length - 1]
      const newYears = Array.from({ length: 10 }, (_, i) => lastYear + 1 + i)
      years.value = [...years.value, ...newYears]
      
      await nextTick()
      setTimeout(() => { isUpdatingScroll.value = false }, 50)
   }
}

const monthsData = computed<MonthData[]>(() => {
   return datePickerGetMonthsData(currentYear.value).map((month) => ({
      ...month,
      isSelected: props.selectedDate
         ? month.month === props.selectedDate.getMonth() &&
           month.year === props.selectedDate.getFullYear()
         : false,
   }))
})

const monthRows = computed(() => {
   const rows: MonthData[][] = []
   for (let i = 0; i < monthsData.value.length; i += 3) {
      rows.push(monthsData.value.slice(i, i + 3))
   }
   return rows
})

const selectYear = (year: number) => {
   emit('select', year)
}

const selectMonth = (monthData: MonthData) => {
   emit('month-select', monthData.month)
}
</script>

<template>
   <div class="year-view-layout">
      <!-- Years Section (25%) -->
      <div class="years-section">
         <div class="years-list" ref="yearsListRef" @scroll="handleScroll">
            <button
               v-for="year in years"
               :key="year"
               v-memo="[year, year === selectedYear, year === currentYear]"
               :class="[
                  'year-item',
                  {
                     selected: year === selectedYear,
                     current: year === currentYear,
                  },
               ]"
               @click="selectYear(year)">
               {{ year }}
            </button>
         </div>
      </div>

      <!-- Months Section (75%) -->
      <div class="months-section">
         <table class="date-picker-table date-picker-months-table">
            <tbody class="date-picker-months-body">
               <tr
                  v-for="(monthRow, rowIndex) in monthRows"
                  :key="rowIndex"
                  class="date-picker-months-row">
                  <td v-for="month in monthRow" :key="month.month" class="date-picker-month-cell">
                     <button
                        :class="[
                           'date-picker-month',
                           {
                              selected: month.isSelected,
                              disabled: month.isDisabled,
                           },
                        ]"
                        v-memo="[month.month, month.isSelected, month.isDisabled]"
                        @click="selectMonth(month)"
                        :disabled="month.isDisabled">
                        {{ month.name.substring(0, 3) }}
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>
