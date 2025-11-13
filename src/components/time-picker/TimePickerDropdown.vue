<script setup lang="ts">
import { ref, computed } from 'vue'
interface Props {
   selectedHour: number
   selectedMinute: number
   selectedPeriod: 'AM' | 'PM'
   is12Hour: boolean
   minuteInterval?: number
}
interface Emits {
   (e: 'select-hour', hour: number): void
   (e: 'select-minute', minute: number): void
   (e: 'select-period', period: 'AM' | 'PM'): void
   (e: 'close'): void
}
const props = withDefaults(defineProps<Props>(), {
   minuteInterval: 1,
})
const emit = defineEmits<Emits>()
const dropdownRef = ref<HTMLDivElement | null>(null)
const hourScroll = ref<HTMLDivElement | null>(null)
const minuteScroll = ref<HTMLDivElement | null>(null)
const periodScroll = ref<HTMLDivElement | null>(null)
const hours = computed(() => {
   if (props.is12Hour) {
      return Array.from({ length: 12 }, (_, i) => i + 1)
   }
   return Array.from({ length: 24 }, (_, i) => i)
})
const minutes = computed(() => {
   const interval = props.minuteInterval
   const count = Math.floor(60 / interval)
   return Array.from({ length: count }, (_, i) => i * interval)
})
const scrollToSelected = () => {
   if (hourScroll.value) {
      const buttons = hourScroll.value.querySelectorAll('.time-picker-option-button')
      const selectedIndex = Array.from(buttons).findIndex((btn) => btn.classList.contains('selected'))
      if (selectedIndex !== -1) {
         const btn = buttons[selectedIndex] as HTMLButtonElement
         btn.scrollIntoView({ block: 'center', behavior: 'auto' })
      }
   }
   if (minuteScroll.value) {
      const buttons = minuteScroll.value.querySelectorAll('.time-picker-option-button')
      const selectedIndex = Array.from(buttons).findIndex((btn) => btn.classList.contains('selected'))
      if (selectedIndex !== -1) {
         const btn = buttons[selectedIndex] as HTMLButtonElement
         btn.scrollIntoView({ block: 'center', behavior: 'auto' })
      }
   }
   if (props.is12Hour && periodScroll.value) {
      const buttons = periodScroll.value.querySelectorAll('.time-picker-option-button')
      const selectedIndex = Array.from(buttons).findIndex((btn) => btn.classList.contains('selected'))
      if (selectedIndex !== -1) {
         const btn = buttons[selectedIndex] as HTMLButtonElement
         btn.scrollIntoView({ block: 'center', behavior: 'auto' })
      }
   }
}
const handleHourClick = (hour: number) => {
   emit('select-hour', hour)
}
const handleMinuteClick = (minute: number) => {
   emit('select-minute', minute)
}
const handlePeriodClick = (period: 'AM' | 'PM') => {
   emit('select-period', period)
}

defineExpose({ scrollToSelected })
</script>
<template>
   <div ref="dropdownRef" class="time-picker-dropdown">
      <div class="time-picker-sections">
         <div class="time-picker-time-section">
            <div ref="hourScroll" class="time-picker-options-scroll">
               <button
                  v-for="hour in hours"
                  :key="hour"
                  type="button"
                  :class="['time-picker-option-button', { selected: hour === selectedHour }]"
                  @click="handleHourClick(hour)">
                  {{ String(hour).padStart(2, '0') }}
               </button>
            </div>
         </div>
         <div class="time-picker-time-section">
            <div ref="minuteScroll" class="time-picker-options-scroll">
               <button
                  v-for="minute in minutes"
                  :key="minute"
                  type="button"
                  :class="['time-picker-option-button', { selected: minute === selectedMinute }]"
                  @click="handleMinuteClick(minute)">
                  {{ String(minute).padStart(2, '0') }}
               </button>
            </div>
         </div>
         <div v-if="is12Hour" class="time-picker-time-section time-picker-period-section">
            <div ref="periodScroll" class="time-picker-options-scroll">
               <button
                  type="button"
                  :class="['time-picker-option-button', { selected: selectedPeriod === 'AM' }]"
                  @click="handlePeriodClick('AM')">
                  AM
               </button>
               <button
                  type="button"
                  :class="['time-picker-option-button', { selected: selectedPeriod === 'PM' }]"
                  @click="handlePeriodClick('PM')">
                  PM
               </button>
            </div>
         </div>
      </div>
   </div>
</template>
