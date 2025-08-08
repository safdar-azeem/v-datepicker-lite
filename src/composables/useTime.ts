import { computed, ref } from 'vue'

export function useTime(
   selectedTime: Date | null,
   timeFormat: '12h' | '24h' = '24h',
   timeInterval: 15 | 30 | 60 = 15,
   emit: any
) {
   const hours = ref(0)
   const minutes = ref(0)
   const timeOptions = ref<string[]>([])

   const is12HourFormat = computed(() => timeFormat === '12h')

   const initializeTime = () => {
      if (selectedTime) {
         hours.value = selectedTime.getHours()
         minutes.value = selectedTime.getMinutes()
      } else {
         const now = new Date()
         hours.value = now.getHours()
         minutes.value = now.getMinutes()
      }
      generateTimeOptions()
   }

   const updateTime = (newSelectedTime: Date | null) => {
      if (newSelectedTime) {
         hours.value = newSelectedTime.getHours()
         minutes.value = newSelectedTime.getMinutes()
      }
   }

   const generateTimeOptions = () => {
      const options = []
      const startHour = is12HourFormat.value ? 1 : 0

      for (let period = 0; period < (is12HourFormat.value ? 2 : 1); period++) {
         const periodSuffix = is12HourFormat.value ? (period === 0 ? ' AM' : ' PM') : ''

         for (let h = startHour; h <= (is12HourFormat.value ? 12 : 23); h++) {
            for (let m = 0; m < 60; m += timeInterval) {
               const displayHour = is12HourFormat.value ? h : h
               const hourValue = is12HourFormat.value
                  ? h === 12
                     ? period === 0
                        ? 0
                        : 12
                     : h + period * 12
                  : h

               const timeString = `${String(displayHour).padStart(2, '0')}:${String(m).padStart(2, '0')}`
               const displayString = timeString + periodSuffix

               options.push({
                  display: displayString,
                  value: `${String(hourValue).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
                  hour: hourValue,
                  minute: m,
               })
            }
         }
      }

      if (!is12HourFormat.value) {
         timeOptions.value = options.map((opt) => opt.value)
      } else {
         timeOptions.value = options.map((opt) => opt.display)
      }
   }

   const getCurrentTimeString = () => {
      if (is12HourFormat.value) {
         const displayHour = hours.value === 0 ? 12 : hours.value > 12 ? hours.value - 12 : hours.value
         const period = hours.value < 12 ? ' AM' : ' PM'
         return `${String(displayHour).padStart(2, '0')}:${String(minutes.value).padStart(
            2,
            '0'
         )}${period}`
      }
      return `${String(hours.value).padStart(2, '0')}:${String(minutes.value).padStart(2, '0')}`
   }

   const selectTime = (timeString: string) => {
      let h: number
      let m: number

      if (is12HourFormat.value) {
         const [time, period] = timeString.split(' ')
         const [hourStr, minuteStr] = time.split(':')
         h = parseInt(hourStr)
         m = parseInt(minuteStr)

         if (period === 'AM') {
            if (h === 12) h = 0
         } else {
            if (h !== 12) h += 12
         }
      } else {
         const [hourStr, minuteStr] = timeString.split(':')
         h = parseInt(hourStr)
         m = parseInt(minuteStr)
      }

      hours.value = h
      minutes.value = m

      const newTime = selectedTime ? new Date(selectedTime.getTime()) : new Date()
      newTime.setHours(h, m, 0, 0)

      emit('update', newTime)
   }

   const scrollToSelected = (timeListRef: HTMLDivElement | null) => {
      if (!timeListRef) return

      const selectedIndex = timeOptions.value.findIndex((time) => time === getCurrentTimeString())

      if (selectedIndex >= 0) {
         const optionHeight = 30
         const containerHeight = timeListRef.clientHeight
         const scrollPosition = selectedIndex * optionHeight - containerHeight / 2 + optionHeight / 2

         timeListRef.scrollTop = Math.max(0, scrollPosition)
      }
   }

   const onTimeUpdate = (time: Date) => {
      hours.value = time.getHours()
      minutes.value = time.getMinutes()
      emit('update', time)
   }

   return {
      hours,
      minutes,
      timeOptions,
      is12HourFormat,
      initializeTime,
      updateTime,
      generateTimeOptions,
      getCurrentTimeString,
      selectTime,
      scrollToSelected,
      onTimeUpdate,
   }
}
