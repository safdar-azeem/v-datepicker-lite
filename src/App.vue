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
      <h1 style="margin-bottom: 0.5em; color: #374151">Vue Datepicker Lite</h1>
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
   width: 296.672px;
}
</style>
