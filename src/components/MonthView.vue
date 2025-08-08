<script setup lang="ts">
import { computed } from 'vue'
import type { MonthData } from '../types'
import { datePickerGetMonthsData } from '../utils'

interface Props {
   currentDate: Date
   selectedDate: Date | null
}

interface Emits {
   (e: 'select', month: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const monthsData = computed<MonthData[]>(() => {
   const months = datePickerGetMonthsData(props.currentDate.getFullYear())

   return months.map((month) => ({
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

const selectMonth = (monthData: MonthData) => {
   emit('select', monthData.month)
}
</script>

<template>
   <div class="date-picker-content">
      <table class="date-picker-table date-picker-months-table">
         <tbody class="date-picker-months-body">
            <tr v-for="(monthRow, rowIndex) in monthRows" :key="rowIndex" class="date-picker-months-row">
               <td v-for="month in monthRow" :key="month.month" class="date-picker-month-cell">
                  <button
                     :class="[
                        'date-picker-month',
                        {
                           selected: month.isSelected,
                           disabled: month.isDisabled,
                        },
                     ]"
                     @click="selectMonth(month)"
                     :disabled="month.isDisabled">
                     {{ month.name }}
                  </button>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>
