<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarDate } from '../types'
import {
   datePickerGetMonthDays,
   datePickerIsSameDay,
   datePickerIsDateDisabled,
   datePickerDayNames,
} from '../utils'

interface Props {
   currentDate: Date
   selectedDate: Date | null
   minDate?: string
   maxDate?: string
   disabledDates?: { start: string; end?: string }[]
}

interface Emits {
   (e: 'select', date: Date): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const calendarDays = computed<CalendarDate[]>(() => {
   const days = datePickerGetMonthDays(props.currentDate.getFullYear(), props.currentDate.getMonth())

   return days.map((day) => ({
      ...day,
      isSelected: props.selectedDate ? datePickerIsSameDay(day.date, props.selectedDate) : false,
      isDisabled: datePickerIsDateDisabled(day.date, props.minDate, props.maxDate, props.disabledDates),
   }))
})

const calendarWeeks = computed(() => {
   const weeks: CalendarDate[][] = []
   for (let i = 0; i < calendarDays.value.length; i += 7) {
      weeks.push(calendarDays.value.slice(i, i + 7))
   }
   return weeks.filter((week) => week.some((day) => day.isCurrentMonth))
})

const selectDate = (day: CalendarDate) => {
   if (day.isDisabled) return
   emit('select', day.date)
}
</script>

<template>
   <div class="date-picker-content dates">
      <table class="date-picker-table">
         <thead>
            <tr class="date-picker-weekdays-row">
               <th v-for="dayName in datePickerDayNames" :key="dayName">
                  {{ dayName }}
               </th>
            </tr>
         </thead>
         <tbody class="date-picker-days-body">
            <tr v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex" class="date-picker-week-row">
               <td
                  v-for="day in week"
                  :key="`${day.year}-${day.month}-${day.day}`"
                  class="date-picker-day-cell">
                  <button
                     :class="[
                        'date-picker-day',
                        {
                           'other-month': !day.isCurrentMonth,
                           today: day.isToday,
                           selected: day.isSelected,
                           disabled: day.isDisabled,
                        },
                     ]"
                     @click="selectDate(day)"
                     :disabled="day.isDisabled">
                     {{ day.day }}
                  </button>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<style scoped></style>
