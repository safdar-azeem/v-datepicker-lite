<script setup lang="ts">
import { computed } from 'vue'
import type { ViewMode } from '../types'
import { datePickerMonthNames } from '../utils'

interface Props {
   currentDate: Date
   viewMode: ViewMode
}

interface Emits {
   (e: 'header-click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const headerTitle = computed(() => {
   const year = props.currentDate.getFullYear()
   const month = props.currentDate.getMonth()

   switch (props.viewMode) {
      case 'date':
         return `${datePickerMonthNames[month]} ${year}`
      case 'year':
         const startYear = Math.floor(year / 10) * 10
         const endYear = startYear + 9
         return `${startYear}–${endYear}`
      default:
         return `${datePickerMonthNames[month]} ${year}`
   }
})

const onHeaderClick = () => {
   emit('header-click')
}
</script>

<template>
   <button class="date-picker-title" @click="onHeaderClick" type="button">
      {{ headerTitle }}
   </button>
</template>

