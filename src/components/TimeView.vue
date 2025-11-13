<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useTime } from '../composables/useTime'

interface Props {
   selectedTime: Date | null
   timeFormat?: '12h' | '24h'
   minuteInterval?: number
}

interface Emits {
   (e: 'update', time: Date): void
}

const props = withDefaults(defineProps<Props>(), {
   timeFormat: '24h',
   minuteInterval: 1,
})

const emit = defineEmits<Emits>()

const timeListRef = ref<HTMLDivElement | null>(null)

const { timeOptions, initializeTime, updateTime, getCurrentTimeString, selectTime, scrollToSelected } =
   useTime(props.selectedTime, props.timeFormat, props.minuteInterval, emit)

watch(
   () => props.selectedTime,
   (newTime) => {
      updateTime(newTime)
      nextTick(() => {
         scrollToSelected(timeListRef.value)
      })
   },
   { immediate: true }
)

watch(
   () => props.timeFormat,
   () => {
      initializeTime()
      nextTick(() => {
         scrollToSelected(timeListRef.value)
      })
   }
)

watch(
   () => props.minuteInterval,
   () => {
      initializeTime()
      nextTick(() => {
         scrollToSelected(timeListRef.value)
      })
   }
)

onMounted(() => {
   initializeTime()
   nextTick(() => {
      setTimeout(() => {
         scrollToSelected(timeListRef.value)
      }, 3)
   })
})
</script>

<template>
   <div class="time-picker-container">
      <div ref="timeListRef" class="time-wheel" role="listbox" aria-label="Time Selection">
         <div
            v-for="time in timeOptions"
            :key="time"
            class="time-option"
            :class="{
               selected: time === getCurrentTimeString(),
            }"
            role="option"
            :aria-selected="time === getCurrentTimeString()"
            @click="selectTime(time)">
            {{ time }}
         </div>
      </div>
   </div>
</template>
