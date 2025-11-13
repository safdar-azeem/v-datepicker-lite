export interface DisabledDateRange {
   start: string
   end?: string
}

export interface DatePickerProps {
   value?: Date | string | null
   mode?: 'date' | 'time' | 'dateTime' | 'week' | 'month'
   minDate?: string
   maxDate?: string
   disabledDates?: DisabledDateRange[]
   format?: string
   disabled?: boolean
   readonly?: boolean
   timeFormat?: '12h' | '24h'
   minuteInterval?: number
}

export interface DatePickerEmits {
   'update:value': [value: Date | string | null]
   change: [value: Date | string | null]
   select: [value: Date | string | null]
}

export interface CalendarDate {
   date: Date
   day: number
   month: number
   year: number
   isCurrentMonth: boolean
   isToday: boolean
   isSelected: boolean
   isDisabled: boolean
   weekNumber?: number
}

export interface WeekData {
   weekNumber: number
   days: CalendarDate[]
   isSelected: boolean
}

export interface MonthData {
   month: number
   year: number
   name: string
   isSelected: boolean
   isDisabled: boolean
}

export interface YearData {
   year: number
   isSelected: boolean
   isDisabled: boolean
   isCurrent: boolean
}

export type DatePickerMode = 'date' | 'time' | 'dateTime' | 'week' | 'month'
export type ViewMode = 'date' | 'month' | 'year' | 'time'
export type TimeFormat = '12h' | '24h'
