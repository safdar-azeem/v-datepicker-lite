<script setup lang="ts">
import { computed } from 'vue'

interface Props {
   hour: number
   minute: number
   period: 'AM' | 'PM'
   is12Hour: boolean
   triggerClass?: string
   disabled?: boolean
   readonly?: boolean
}

const props = defineProps<Props>()

const displayTime = computed(() => {
   const formattedMinute = String(props.minute).padStart(2, '0')

   if (props.is12Hour) {
      let displayHour = props.hour % 12
      if (displayHour === 0) {
         displayHour = 12
      }
      const formattedHour = String(displayHour).padStart(2, '0')
      return `${formattedHour}:${formattedMinute} ${props.period}`
   } else {
      const formattedHour = String(props.hour).padStart(2, '0')
      return `${formattedHour}:${formattedMinute}`
   }
})
</script>

<template>
   <slot v-bind="{ displayTime }">
      <button
         type="button"
         class="time-picker-input"
         :class="[triggerClass, { 'is-disabled': disabled, 'is-readonly': readonly }]"
         :disabled="disabled || readonly">
         <span class="time-display">{{ displayTime }}</span>
         <svg
            class="time-picker-clock-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
         </svg>
      </button>
   </slot>
</template>
