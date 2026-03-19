import { ref, computed } from 'vue'
import { ViewMode } from '../types'
import {
   datePickerFormatDate,
   datePickerParseDate,
   datePickerIsSameDay,
   datePickerIsSameMonth,
   datePickerIsDateDisabled,
} from '../utils'

export function useCalendar(props: any, emit: any) {
   const currentDate = ref(new Date())
   const viewMode = ref<ViewMode>('date')

   const selectedDate = computed(() => {
      if (!props.value) return null
      if (props.value instanceof Date) return props.value
      return datePickerParseDate(props.value)
   })

   const detectDateFormat = (dateString: string): string => {
      const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/

      if (isoDateTimeRegex.test(dateString)) {
         return dateString.includes('.') ? 'YYYY-MM-DDTHH:mm:ss.sssZ' : 'YYYY-MM-DDTHH:mm:ssZ'
      } else if (isoDateRegex.test(dateString)) {
         return 'YYYY-MM-DD'
      }

      return props.format || 'YYYY-MM-DD'
   }

   const hasTime = computed(() => {
      if (!props.value) return false
      if (props.value instanceof Date) return true

      const format = detectDateFormat(props.value)
      // Check if format contains time indicators
      return format.includes('H') || format.includes('h') || format.includes('m') || format.includes('T')
   })

   const canGoPrev = computed(() => {
      if (!props.minDate) return true
      const minDate = datePickerParseDate(props.minDate)
      if (!minDate) return true

      const currentYear = currentDate.value.getFullYear()
      const currentMonth = currentDate.value.getMonth()

      return new Date(currentYear, currentMonth, 1) > minDate
   })

   const canGoNext = computed(() => {
      if (!props.maxDate) return true
      const maxDate = datePickerParseDate(props.maxDate)
      if (!maxDate) return true

      const currentYear = currentDate.value.getFullYear()
      const currentMonth = currentDate.value.getMonth()

      return new Date(currentYear, currentMonth + 1, 0) < maxDate
   })

   const goToPrevMonth = () => {
      if (!canGoPrev.value) return
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
   }

   const goToNextMonth = () => {
      if (!canGoNext.value) return
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
   }

   const goToPrevYear = () => {
      currentDate.value = new Date(currentDate.value.getFullYear() - 1, currentDate.value.getMonth(), 1)
   }

   const goToNextYear = () => {
      currentDate.value = new Date(currentDate.value.getFullYear() + 1, currentDate.value.getMonth(), 1)
   }

   const goToPrevDecade = () => {
      currentDate.value = new Date(currentDate.value.getFullYear() - 10, currentDate.value.getMonth(), 1)
   }

   const goToNextDecade = () => {
      currentDate.value = new Date(currentDate.value.getFullYear() + 10, currentDate.value.getMonth(), 1)
   }

   const goToCurrentDate = () => {
      currentDate.value = new Date()
      viewMode.value = 'date'
   }

   const onHeaderClick = () => {
      switch (viewMode.value) {
         case 'date':
            viewMode.value = 'year'
            break
         case 'year':
            viewMode.value = 'date'
            break
      }
   }

   const onDateSelect = (date: Date) => {
      if (datePickerIsDateDisabled(date, props.minDate, props.maxDate, props.disabledDates)) return

      // Toggle logic for Date
      if (selectedDate.value && datePickerIsSameDay(selectedDate.value, date)) {
         emit('update:value', null)
         emit('change', null)
         emit('select', null)
         return
      }

      if (props.mode === 'dateTime' && selectedDate.value) {
         date.setHours(selectedDate.value.getHours(), selectedDate.value.getMinutes())
      }
      emitValue(date)
   }

   const onWeekSelect = (weekStart: Date) => {
      if (selectedDate.value && datePickerIsSameDay(selectedDate.value, weekStart)) {
         emit('update:value', null)
         emit('change', null)
         emit('select', null)
         return
      }
      emitValue(weekStart)
   }

   const onMonthSelect = (month: number) => {
      const newDate = new Date(currentDate.value.getFullYear(), month, 1)
      currentDate.value = newDate
      viewMode.value = 'date'

      if (props.mode === 'month') {
         if (selectedDate.value && datePickerIsSameMonth(selectedDate.value, newDate)) {
            emit('update:value', null)
            emit('change', null)
            emit('select', null)
            return
         }
         emitValue(newDate)
      }
   }

   const onYearSelect = (year: number) => {
      currentDate.value = new Date(year, currentDate.value.getMonth(), 1)
      viewMode.value = 'date'
   }

   const formatDateToOriginalFormat = (date: Date, originalValue: string): string => {
      const detectedFormat = detectDateFormat(originalValue)

      if (detectedFormat.includes('T')) {
         if (detectedFormat.includes('.sss')) {
            return date.toISOString()
         } else {
            return date.toISOString().replace(/\.\d{3}Z$/, 'Z')
         }
      }

      return datePickerFormatDate(date, detectedFormat)
   }

   // Added forceTime parameter
   const emitValue = (date: Date, forceTime = false) => {
      let value: Date | string

      if (typeof props.value === 'string' || props.value === null || props.value === undefined) {
         // If a custom format is explicitly set (other than the default), honor it
         if (props.format && props.format !== 'YYYY-MM-DD' && !forceTime && props.mode !== 'dateTime' && props.mode !== 'time') {
             value = datePickerFormatDate(date, props.format)
         } else if (props.mode === 'dateTime' || props.mode === 'time' || forceTime) {
            // Standard ISO 8601 for full date & time (UTC)
            value = date.toISOString()
         } else {
            // Strict Date format (Local) to prevent timezone shifts
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            value = `${year}-${month}-${day}`
         }
      } else {
         value = date
      }

      emit('update:value', value)
      emit('change', value)
      emit('select', value)
   }

   return {
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
   }
}
