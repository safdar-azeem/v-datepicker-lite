<script setup lang="ts">
import { computed } from 'vue'
import type { ViewMode } from '../types'
import { datePickerMonthNames } from '../utils'
import { datePickerChevronLeft, datePickerChevronRight, datePickerCurrentDate } from '../constants/icons'

interface Props {
   currentDate: Date
   viewMode: ViewMode
   canGoPrev: boolean
   canGoNext: boolean
}

interface Emits {
   (e: 'prev'): void
   (e: 'next'): void
   (e: 'header-click'): void
   (e: 'current-date'): void
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

const onPrev = () => {
   emit('prev')
}

const onNext = () => {
   emit('next')
}

const onHeaderClick = () => {
   emit('header-click')
}

const onCurrentDate = () => {
   emit('current-date')
}
</script>

<template>
   <div class="date-picker-header">
      <button class="date-picker-title" @click="onHeaderClick" type="button">
         {{ headerTitle }}
      </button>

      <button
         class="date-picker-nav-button ml-auto"
         :disabled="!canGoPrev"
         @click="onPrev"
         type="button"
         aria-label="Previous">
         <span class="date-picker-nav-icon" v-html="datePickerChevronLeft"></span>
      </button>

      <button
         class="date-picker-nav-button"
         @click="onCurrentDate"
         type="button"
         aria-label="Current Date">
         <span class="date-picker-nav-icon" v-html="datePickerCurrentDate"></span>
      </button>

      <button
         class="date-picker-nav-button"
         :disabled="!canGoNext"
         @click="onNext"
         type="button"
         aria-label="Next">
         <span class="date-picker-nav-icon" v-html="datePickerChevronRight"></span>
      </button>
   </div>
</template>
