<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from './components/DatePicker.vue'
import CustomTimePicker from './components/time-picker/TimePicker.vue'

const dateValue = ref<Date | null>(null)
const weekValue = ref<Date | null>(null)
const monthValue = ref<Date | null>(null)
const customTime12h = ref<string | null>(null)
const dateTimeValue5min = ref<Date | null>()
const dateTimeValue10min = ref<Date | null>()
const dateTimeValue15min = ref<Date | null>()
const customTime5min = ref<string | null>(null)
const customTime30min = ref<string | null>(null)

const handleDateChange = (date: any) => {
   console.log('date :>> ', date)
}
</script>

<template>
   <div
      style="
         padding: 2em;
         max-width: 450px;
         margin: 0 auto;
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
      <div
         style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2em">
         <h1 style="margin: 0; color: #374151; font-size: 1.5em">Vue Datepicker Lite</h1>
         <a
            href="https://github.com/safdar-azeem/v-datepicker-lite#readme"
            target="_blank"
            rel="noopener noreferrer"
            class="github-button">
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
               <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>GitHub</span>
         </a>
      </div>

      <div style="display: grid; gap: 2em">
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">Date Mode</h3>
            <DatePicker class="date-picker-container" v-model:value="dateValue" mode="date" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ dateValue ? dateValue.toLocaleDateString() : 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">Week Mode</h3>
            <DatePicker class="date-picker-container" v-model:value="weekValue" mode="week" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ weekValue ? weekValue.toLocaleDateString() : 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">Month Mode</h3>
            <DatePicker class="date-picker-container" v-model:value="monthValue" mode="month" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ monthValue ? monthValue.toLocaleDateString() : 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">DateTime Mode - 5min interval</h3>
            <DatePicker
               class="date-picker-container-wide"
               v-model:value="dateTimeValue5min"
               mode="dateTime"
               time-format="12h"
               :minute-interval="5" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ dateTimeValue5min ? dateTimeValue5min.toLocaleString() : 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">DateTime Mode - 10min interval</h3>
            <DatePicker
               class="date-picker-container-wide"
               v-model:value="dateTimeValue10min"
               mode="dateTime"
               time-format="12h"
               :minute-interval="10" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ dateTimeValue10min ? dateTimeValue10min.toLocaleString() : 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">DateTime Mode - 15min interval</h3>
            <DatePicker
               class="date-picker-container-wide"
               v-model:value="dateTimeValue15min"
               mode="dateTime"
               time-format="24h"
               :minute-interval="15" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ dateTimeValue15min ? dateTimeValue15min.toLocaleString() : 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">Custom Time Picker - 12h Format</h3>
            <CustomTimePicker
               v-model:model-value="customTime12h"
               time-format="12h"
               v-slot="{ displayTime }">
               <button>{{ displayTime }}</button>
            </CustomTimePicker>
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ customTime12h || 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">Custom Time Picker - 5min interval</h3>
            <CustomTimePicker
               v-model:model-value="customTime5min"
               time-format="12h"
               :minute-interval="5" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ customTime5min || 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">Custom Time Picker - 30min interval</h3>
            <CustomTimePicker
               v-model:model-value="customTime30min"
               time-format="24h"
               :minute-interval="30" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Selected:
               {{ customTime30min || 'None' }}
            </p>
         </div>
         <div>
            <h3 style="margin-bottom: 0.5em; color: #374151">With Restrictions</h3>
            <DatePicker
               class="date-picker-container"
               mode="date"
               @change="handleDateChange"
               :min-date="new Date().toISOString().split('T')[0]"
               :disabled-dates="[{ start: '2025-08-15', end: '2025-08-20' }, { start: '2025-08-25' }]" />
            <p style="margin-top: 0.5em; color: #6b7280; font-size: 0.875em">
               Min date: Today, Disabled: Aug 15-20 & Aug 25
            </p>
         </div>
      </div>
   </div>
</template>

<style scoped>
.date-picker-container {
   border: 1px solid #e5e7eb;
   border-radius: 0.25rem;
   padding: 0px;
   width: 296.672px;
}
.date-picker-container-wide {
   border: 1px solid #e5e7eb;
   border-radius: 0.25rem;
   padding: 0px;
   width: 350.672px;
}
.github-button {
   display: flex;
   align-items: center;
   gap: 0.5em;
   padding: 0.5em 0.75em;
   background-color: #24292e;
   color: white;
   text-decoration: none;
   border-radius: 0.375rem;
   font-size: 0.875rem;
   font-weight: 500;
   transition: background-color 0.2s;
}
.github-button:hover {
   background-color: #1b1f23;
}
</style>
