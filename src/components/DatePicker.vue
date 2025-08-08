<script setup lang="ts">
import '../css/style.css'
import { ref, onMounted } from 'vue'
import DateView from './DateView.vue'
import WeekView from './WeekView.vue'
import TimeView from './TimeView.vue'
import YearView from './YearView.vue'
import MonthView from './MonthView.vue'
import type { DatePickerProps } from '../types'
import DatePickerHeader from './DatePickerHeader.vue'
import { useCalendar } from '../composables/useCalendar'

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
   timeInterval: 15,
})

const emit = defineEmits<Emits>()

const datePickerContent = ref<HTMLDivElement | null>(null)
const datePickerContentHeight = ref<number>(0)

const {
   currentDate,
   viewMode,
   selectedDate,
   canGoPrev,
   canGoNext,
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

const onTimeUpdate = (newTime: Date) => {
   emitValue(newTime)
}

onMounted(() => {
   if (datePickerContent.value) {
      datePickerContentHeight.value = datePickerContent.value.clientHeight
   }
})
</script>

<template>
   <div class="date-picker">
      <DatePickerHeader
         v-if="mode !== 'time'"
         :current-date="currentDate"
         :view-mode="viewMode"
         :can-go-prev="canGoPrev"
         :can-go-next="canGoNext"
         @prev="
            viewMode === 'year'
               ? goToPrevDecade()
               : viewMode === 'month'
               ? goToPrevYear()
               : goToPrevMonth()
         "
         @next="
            viewMode === 'year'
               ? goToNextDecade()
               : viewMode === 'month'
               ? goToNextYear()
               : goToNextMonth()
         "
         @header-click="onHeaderClick"
         @current-date="goToCurrentDate" />

      <div
         :class="{
            'date-picker-datetime-layout': mode === 'dateTime' && viewMode === 'date',
         }"
         :style="{
            height: datePickerContentHeight !== 0 ? datePickerContentHeight + 'px' : '100%',
         }">
         <div class="date-picker-date-section" ref="datePickerContent">
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
               :selected-time="selectedDate"
               :time-format="timeFormat"
               :time-interval="timeInterval"
               @update="onTimeUpdate" />
         </div>
      </div>

      <TimeView
         v-if="mode === 'time'"
         :selected-time="selectedDate"
         :time-format="timeFormat"
         :time-interval="timeInterval"
         @update="onTimeUpdate" />
   </div>
</template>
