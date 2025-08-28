import { ref, computed } from 'vue'
import { ViewMode } from '../types'
import { datePickerFormatDate, datePickerParseDate } from '../utils'

export function useCalendar(props: any, emit: any) {
   const currentDate = ref(new Date())
   const viewMode = ref<ViewMode>('date')

   const selectedDate = computed(() => {
      if (!props.value) return null
      if (props.value instanceof Date) return props.value
      return datePickerParseDate(props.value)
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
      if (props.mode === 'dateTime' && selectedDate.value) {
         date.setHours(selectedDate.value.getHours(), selectedDate.value.getMinutes())
      }
      emitValue(date)
   }

   const onWeekSelect = (weekStart: Date) => {
      emitValue(weekStart)
   }

   const onMonthSelect = (month: number) => {
      currentDate.value = new Date(currentDate.value.getFullYear(), month, 1)
      viewMode.value = 'date'

      if (props.mode === 'month') {
         emitValue(new Date(currentDate.value.getFullYear(), month, 1))
      }
   }

   const onYearSelect = (year: number) => {
      currentDate.value = new Date(year, currentDate.value.getMonth(), 1)
      viewMode.value = 'date'
   }

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

   const emitValue = (date: Date) => {
      let value: Date | string

      if (typeof props.value === 'string') {
         value = formatDateToOriginalFormat(date, props.value)
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
