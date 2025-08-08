import type { CalendarDate, WeekData, MonthData, DisabledDateRange } from '../types'

export const datePickerFormatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
   const year = date.getFullYear()
   const month = String(date.getMonth() + 1).padStart(2, '0')
   const day = String(date.getDate()).padStart(2, '0')
   const hours = String(date.getHours()).padStart(2, '0')
   const minutes = String(date.getMinutes()).padStart(2, '0')

   return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
}

export const datePickerParseDate = (dateString: string): Date | null => {
   if (!dateString) return null
   const date = new Date(dateString)
   return isNaN(date.getTime()) ? null : date
}

export const datePickerIsSameDay = (date1: Date, date2: Date): boolean => {
   return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
   )
}

export const datePickerIsSameMonth = (date1: Date, date2: Date): boolean => {
   return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}

export const datePickerGetWeekNumber = (date: Date): number => {
   const startOfYear = new Date(date.getFullYear(), 0, 1)
   const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000
   return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)
}

export const datePickerGetMonthDays = (year: number, month: number): CalendarDate[] => {
   const firstDay = new Date(year, month, 1)
   const lastDay = new Date(year, month + 1, 0)
   const daysInMonth = lastDay.getDate()
   const startingDay = firstDay.getDay()

   const days: CalendarDate[] = []
   const today = new Date()

   // Previous month days
   const prevMonth = month === 0 ? 11 : month - 1
   const prevYear = month === 0 ? year - 1 : year
   const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate()

   for (let i = startingDay - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, prevMonthLastDay - i)
      days.push({
         date,
         day: prevMonthLastDay - i,
         month: prevMonth,
         year: prevYear,
         isCurrentMonth: false,
         isToday: datePickerIsSameDay(date, today),
         isSelected: false,
         isDisabled: false,
      })
   }

   // Current month days
   for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({
         date,
         day,
         month,
         year,
         isCurrentMonth: true,
         isToday: datePickerIsSameDay(date, today),
         isSelected: false,
         isDisabled: false,
      })
   }

   // Next month days
   const remainingDays = 42 - days.length
   const nextMonth = month === 11 ? 0 : month + 1
   const nextYear = month === 11 ? year + 1 : year

   for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day)
      days.push({
         date,
         day,
         month: nextMonth,
         year: nextYear,
         isCurrentMonth: false,
         isToday: datePickerIsSameDay(date, today),
         isSelected: false,
         isDisabled: false,
      })
   }

   return days
}

export const datePickerGetWeekData = (year: number, month: number): WeekData[] => {
   const days = datePickerGetMonthDays(year, month)
   const weeks: WeekData[] = []

   for (let i = 0; i < days.length; i += 7) {
      const weekDays = days.slice(i, i + 7)
      const weekNumber = datePickerGetWeekNumber(weekDays[0].date)

      weeks.push({
         weekNumber,
         days: weekDays,
         isSelected: false,
      })
   }

   return weeks
}

export const datePickerGetMonthsData = (year: number): MonthData[] => {
   const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ]

   return months.map((name, index) => ({
      month: index,
      year,
      name,
      isSelected: false,
      isDisabled: false,
   }))
}

export const datePickerIsDateDisabled = (
   date: Date,
   minDate?: string,
   maxDate?: string,
   disabledDates?: DisabledDateRange[]
): boolean => {
   const dateStr = datePickerFormatDate(date, 'YYYY-MM-DD')

   if (minDate && dateStr < minDate) return true
   if (maxDate && dateStr > maxDate) return true

   if (disabledDates) {
      return disabledDates.some((range) => {
         if (range.end) {
            return dateStr >= range.start && dateStr <= range.end
         }
         return dateStr === range.start
      })
   }

   return false
}

export const datePickerGetYearsRange = (centerYear: number, range: number = 10): number[] => {
   const start = centerYear - Math.floor(range / 2)
   return Array.from({ length: range }, (_, i) => start + i)
}

export const datePickerMonthNames = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
]

export const datePickerDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
