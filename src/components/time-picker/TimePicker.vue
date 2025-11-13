<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import TimePickerDropdown from './TimePickerDropdown.vue'
import TimePickerInput from './TimePickerInput.vue'
import ToolTip from 'v-tooltip-lite'
interface Props {
   modelValue?: string | null
   timeFormat?: '12h' | '24h'
   triggerClass?: string
   style?: any
   className?: any
   offset?: [number, number]
   minuteInterval?: number
}
interface Emits {
   (e: 'update:modelValue', value: string): void
}
const props = withDefaults(defineProps<Props>(), {
   modelValue: null,
   timeFormat: '12h',
   offset: () => [0, 10],
   minuteInterval: 1,
})
const emit = defineEmits<Emits>()
const selectedHour = ref(12)
const selectedMinute = ref(0)
const selectedPeriod = ref<'AM' | 'PM'>('AM')
const dropdownRef = ref<InstanceType<typeof TimePickerDropdown> | null>(null)
const is12Hour = computed(() => props.timeFormat === '12h')
const initializeTime = () => {
   if (props.modelValue) {
      const [hStr, mStr] = props.modelValue.split(':')
      const hours24 = parseInt(hStr)
      const minutes = parseInt(mStr)
      selectedMinute.value = minutes
      if (is12Hour.value) {
         if (hours24 === 0) {
            selectedHour.value = 12
            selectedPeriod.value = 'AM'
         } else if (hours24 === 12) {
            selectedHour.value = 12
            selectedPeriod.value = 'PM'
         } else if (hours24 > 12) {
            selectedHour.value = hours24 - 12
            selectedPeriod.value = 'PM'
         } else {
            selectedHour.value = hours24
            selectedPeriod.value = 'AM'
         }
      } else {
         selectedHour.value = hours24
      }
   } else {
      const now = new Date()
      const hours24 = now.getHours()
      const minutes = now.getMinutes()
      selectedMinute.value = minutes
      if (is12Hour.value) {
         if (hours24 === 0) {
            selectedHour.value = 12
            selectedPeriod.value = 'AM'
         } else if (hours24 === 12) {
            selectedHour.value = 12
            selectedPeriod.value = 'PM'
         } else if (hours24 > 12) {
            selectedHour.value = hours24 - 12
            selectedPeriod.value = 'PM'
         } else {
            selectedHour.value = hours24
            selectedPeriod.value = 'AM'
         }
      } else {
         selectedHour.value = hours24
      }
   }
}
const emitTime = () => {
   let hours24 = selectedHour.value
   if (is12Hour.value) {
      if (selectedPeriod.value === 'AM' && hours24 === 12) {
         hours24 = 0
      } else if (selectedPeriod.value === 'PM' && hours24 !== 12) {
         hours24 += 12
      }
   }
   const timeStr = `${String(hours24).padStart(2, '0')}:${String(selectedMinute.value).padStart(2, '0')}`
   emit('update:modelValue', timeStr)
}
const handleHourSelect = (hour: number) => {
   selectedHour.value = hour
   emitTime()
}
const handleMinuteSelect = (minute: number) => {
   selectedMinute.value = minute
   emitTime()
}
const handlePeriodSelect = (period: 'AM' | 'PM') => {
   selectedPeriod.value = period
   emitTime()
}

const scrollToSelected = () => {
   dropdownRef?.value?.scrollToSelected()
}

watch(() => props.modelValue, initializeTime, { immediate: true })
watch(() => props.timeFormat, initializeTime)
watch(() => props.minuteInterval, initializeTime)
</script>
<template>
   <div
      :style="{
         width: '100%',
      }">
      <ToolTip
         trigger="click"
         placement="bottom-start"
         :onOnShow="scrollToSelected"
         teleport
         :arrow="false"
         :offset="offset"
         triggerClass="w-full"
         :class-name="`v-time-picker ${className}`"
         :styles="style"
         :style="{
            width: '100%',
         }">
         <template #trigger>
            <TimePickerInput
               :hour="selectedHour"
               :minute="selectedMinute"
               :period="selectedPeriod"
               :is12-hour="is12Hour"
               :trigger-class="triggerClass"
               v-slot="{ displayTime }">
               <slot v-bind="{ displayTime }" />
            </TimePickerInput>
         </template>

         <TimePickerDropdown
            ref="dropdownRef"
            :selected-hour="selectedHour"
            :selected-minute="selectedMinute"
            :selected-period="selectedPeriod"
            :is12-hour="is12Hour"
            :minute-interval="minuteInterval"
            @select-hour="handleHourSelect"
            @select-minute="handleMinuteSelect"
            @select-period="handlePeriodSelect" />
      </ToolTip>
   </div>
</template>
