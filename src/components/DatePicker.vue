<script setup lang="ts">
import '../css/style.css'
import DateView from './DateView.vue'
import WeekView from './WeekView.vue'
import TimeView from './TimeView.vue'
import YearView from './YearView.vue'
import MonthView from './MonthView.vue'
import type { DatePickerProps } from '../types'
import DatePickerHeader from './DatePickerHeader.vue'
import { useCalendar } from '../composables/useCalendar'
import { datePickerFormatDate } from '../utils'
import { datePickerChevronLeft, datePickerChevronRight, datePickerCurrentDate } from '../constants/icons'

interface Props extends DatePickerProps {}

interface Emits {
   (e: 'update:value', value: Date | string | null): void
   (e: 'change', value: Date | string | null): void
   (e: 'select', value: Date | string | null): void
}

const props = withDefaults(defineProps<Props>(), {
   mode: 'date',
   format: 'YYYY-MM-DD',
   timeFormat: '24h',
   minuteInterval: 1,
})

const emit = defineEmits<Emits>()

const {
   currentDate,
   viewMode,
   selectedDate,
   canGoPrev,
   canGoNext,
   hasTime,
   goToPrevMonth,
   goToNextMonth,
   goToPrevYear,
   goToNextYear,
   goToPrevDecade,
   goToNextDecade,
   goToCurrentDate,
   onHeaderClick,
   onDateSelect,
   onWeekSelect,
   onMonthSelect,
   onYearSelect,
   emitValue,
} = useCalendar(props, emit)

const onTimeUpdate = (newTime: Date | null) => {
   if (newTime === null) {
      if (selectedDate.value) {
         const dateOnly = new Date(selectedDate.value)
         dateOnly.setHours(0, 0, 0, 0)

         // Force formatting as Date-only string when clearing time
         const dateStr = datePickerFormatDate(dateOnly, 'YYYY-MM-DD')

         emit('update:value', dateStr)
         emit('change', dateStr)
         emit('select', dateStr)
      }
      return
   }

   // Standard update
   if (props.mode === 'dateTime' && selectedDate.value) {
      const updatedDateTime = new Date(selectedDate.value.getTime())
      updatedDateTime.setHours(newTime.getHours(), newTime.getMinutes(), 0, 0)

      // Pass 'true' as the second argument to force DateTime format
      // ignoring the current string format (which might be date-only)
      emitValue(updatedDateTime, true)
   } else {
      emitValue(newTime, true)
   }
}

const handlePrev = () => {
   if (viewMode.value === 'year') {
      goToPrevDecade()
   } else if (viewMode.value === 'month') {
      goToPrevYear()
   } else {
      goToPrevMonth()
   }
}

const handleNext = () => {
   if (viewMode.value === 'year') {
      goToNextDecade()
   } else if (viewMode.value === 'month') {
      goToNextYear()
   } else {
      goToNextMonth()
   }
}
</script>

<template>
   <div class="date-picker">
      <div v-if="mode !== 'time'" class="date-picker-header">
         <DatePickerHeader
            :current-date="currentDate"
            :view-mode="viewMode"
            @header-click="onHeaderClick" />

         <div class="date-picker-nav ml-auto">
            <button
               class="date-picker-nav-button"
               :disabled="!canGoPrev"
               @click="handlePrev"
               type="button"
               aria-label="Previous">
               <span class="date-picker-nav-icon" v-html="datePickerChevronLeft"></span>
            </button>

            <button
               class="date-picker-nav-button"
               @click="goToCurrentDate"
               type="button"
               aria-label="Current Date">
               <span class="date-picker-nav-icon" v-html="datePickerCurrentDate"></span>
            </button>

            <button
               class="date-picker-nav-button"
               :disabled="!canGoNext"
               @click="handleNext"
               type="button"
               aria-label="Next">
               <span class="date-picker-nav-icon" v-html="datePickerChevronRight"></span>
            </button>
         </div>
      </div>

      <div
         :class="{
            'date-picker-datetime-layout': mode === 'dateTime' && viewMode === 'date',
         }">
         <div class="date-picker-date-section">
            <DateView
               v-if="viewMode === 'date' && (mode === 'date' || mode === 'dateTime')"
               :current-date="currentDate"
               :selected-date="selectedDate"
               :min-date="minDate"
               :max-date="maxDate"
               :disabled-dates="disabledDates"
               @select="onDateSelect" />

            <WeekView
               v-if="mode === 'week' && viewMode === 'date'"
               :current-date="currentDate"
               :selected-date="selectedDate"
               @select="onWeekSelect" />

            <MonthView
               v-if="viewMode !== 'year' && (viewMode === 'month' || mode === 'month')"
               :current-date="currentDate"
               :selected-date="selectedDate"
               @select="onMonthSelect" />

            <YearView
               v-if="viewMode === 'year'"
               :current-date="currentDate"
               :selected-date="selectedDate"
               @select="onYearSelect"
               @month-select="onMonthSelect" />
         </div>

         <div v-if="mode === 'dateTime' && viewMode === 'date'" class="date-picker-time-section">
            <TimeView
               :selected-time="hasTime ? selectedDate : null"
               :time-format="timeFormat"
               :minute-interval="minuteInterval"
               @update="onTimeUpdate" />
         </div>
      </div>

      <TimeView
         v-if="mode === 'time'"
         :selected-time="selectedDate"
         :time-format="timeFormat"
         :minute-interval="minuteInterval"
         @update="onTimeUpdate" />
   </div>
</template>
