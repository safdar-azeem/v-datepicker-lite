# Vue DatePicker

A lightweight and customizable Vue 3 date picker component with support for date, time, date-time, week, and month selection modes, featuring accessibility and responsive design.

## Features

- **Multiple Selection Modes**: Supports `date`, `time`, `dateTime`, `week`, and `month` modes.
- **Responsive Design**: Adapts to various screen sizes with a clean, modern UI.
- **Accessibility**: Includes ARIA attributes and keyboard navigation for enhanced usability.
- **Customizable**: Flexible props for date format, time format, min/max dates, disabled dates, and more.
- **Configurable Time Intervals**: Supports any minute interval (1-60 minutes) for time selection in both TimePicker and DatePicker components.
- **Performance Optimized**: Uses Vue 3 composition API for efficient rendering and state management.
- **TypeScript Support**: Fully typed with TypeScript for better developer experience.

## Demo

[Live Demo](https://v-datepicker-lite.vercel.app/)

## Installation

```bash
# npm
npm install v-datepicker-lite

# yarn
yarn add v-datepicker-lite

# pnpm
pnpm add v-datepicker-lite
```

> Don't forget to follow me on [GitHub](https://github.com/safdar-azeem)!

## Usage

Below are examples demonstrating different configurations of the Vue DatePicker component.

### 1. Basic Date Picker

A simple date picker for selecting a single date.

```vue
<script setup>
import { ref } from 'vue'
import DatePicker from 'v-datepicker-lite'
import 'v-datepicker-lite/style.css'

const selectedDate = ref(null)
</script>

<template>
   <div>
      <h3>Date Picker</h3>
      <DatePicker v-model:value="selectedDate" mode="date" />
      <p>
         Selected:
         {{ selectedDate ? selectedDate.toLocaleDateString() : 'None' }}
      </p>
   </div>
</template>
```

### 2. Week Picker

Select an entire week starting from the first day of the selected week.

```vue
<script setup>
import { ref } from 'vue'
import DatePicker from 'v-datepicker-lite'

const selectedWeek = ref(null)
</script>

<template>
   <div>
      <h3>Week Picker</h3>
      <DatePicker v-model:value="selectedWeek" mode="week" />
      <p>
         Selected:
         {{ selectedWeek ? selectedWeek.toLocaleDateString() : 'None' }}
      </p>
   </div>
</template>
```

### 3. Month Picker

Select a month and year.

```vue
<script setup>
import { ref } from 'vue'
import DatePicker from 'v-datepicker-lite'

const selectedMonth = ref(null)
</script>

<template>
   <div>
      <h3>Month Picker</h3>
      <DatePicker v-model:value="selectedMonth" mode="month" />
      <p>
         Selected:
         {{ selectedMonth ? selectedMonth.toLocaleDateString() : 'None' }}
      </p>
   </div>
</template>
```

### 4. DateTime Picker with Custom Intervals

Select both date and time with configurable minute intervals.

```vue
<script setup>
import { ref } from 'vue'
import DatePicker from 'v-datepicker-lite'

const selectedDateTime = ref(null)
</script>

<template>
   <div>
      <h3>DateTime Picker - 5 minute intervals</h3>
      <DatePicker
         v-model:value="selectedDateTime"
         mode="dateTime"
         time-format="12h"
         :minute-interval="5" />
      <p>
         Selected:
         {{ selectedDateTime ? selectedDateTime.toLocaleString() : 'None' }}
      </p>
   </div>
</template>
```

### 5. Date Picker with Restrictions

Restrict date selection with minimum date and disabled date ranges.

```vue
<script setup>
import { ref } from 'vue'
import DatePicker from 'v-datepicker-lite'

const selectedDate = ref(null)
</script>

<template>
   <div>
      <h3>Restricted Date Picker</h3>
      <DatePicker
         v-model:value="selectedDate"
         mode="date"
         :min-date="new Date().toISOString().split('T')[0]"
         :disabled-dates="[{ start: '2025-08-15', end: '2025-08-20' }, { start: '2025-08-25' }]" />
      <p>
         Selected:
         {{ selectedDate ? selectedDate.toLocaleDateString() : 'None' }}
      </p>
   </div>
</template>
```

### 6. Standalone Time Picker with Custom Intervals

A time picker component for selecting time only, with configurable minute intervals.

```vue
<script setup>
import { ref } from 'vue'
import { TimePicker } from 'v-datepicker-lite'
import 'v-datepicker-lite/style.css'

const selectedTime = ref(null)
</script>

<template>
   <div>
      <h3>Time Picker - 15 minute intervals</h3>
      <TimePicker v-model:model-value="selectedTime" time-format="12h" :minute-interval="15" />

      <!-- With Custom Trigger -->
      <TimePicker
         v-model:model-value="selectedTime"
         time-format="12h"
         :minute-interval="5"
         v-slot="{ displayTime }">
         <button>{{ displayTime }}</button>
      </TimePicker>

      <p>
         Selected:
         {{ selectedTime || 'None' }}
      </p>
   </div>
</template>
```

## Props

| Prop             | Type                     | Default        | Description                                                                    |
| ---------------- | ------------------------ | -------------- | ------------------------------------------------------------------------------ |
| `value`          | `Date \| string \| null` | `null`         | v-model binding for the selected date/time.                                    |
| `mode`           | `string`                 | `'date'`       | Selection mode: `date`, `time`, `dateTime`, `week`, or `month`.                |
| `format`         | `string`                 | `'YYYY-MM-DD'` | Date format for string output (e.g., `YYYY-MM-DD HH:mm`).                      |
| `timeFormat`     | `string`                 | `'24h'`        | Time format: `12h` or `24h`.                                                   |
| `minuteInterval` | `number`                 | `1`            | Minute selection interval (1-60). Controls minute options displayed in picker. |
| `minDate`        | `string`                 | `undefined`    | Minimum selectable date (ISO format: `YYYY-MM-DD`).                            |
| `maxDate`        | `string`                 | `undefined`    | Maximum selectable date (ISO format: `YYYY-MM-DD`).                            |
| `disabledDates`  | `Array`                  | `[]`           | Array of disabled date ranges: `{ start: string, end?: string }`.              |
| `disabled`       | `boolean`                | `false`        | Disables the date picker.                                                      |
| `readonly`       | `boolean`                | `false`        | Makes the date picker read-only.                                               |

## Props - TimePicker

| Prop             | Type             | Default | Description                                                                    |
| ---------------- | ---------------- | ------- | ------------------------------------------------------------------------------ |
| `modelValue`     | `string \| null` | `null`  | v-model binding for the selected time (format: `HH:mm`).                       |
| `timeFormat`     | `string`         | `'12h'` | Time format: `12h` or `24h`.                                                   |
| `minuteInterval` | `number`         | `1`     | Minute selection interval (1-60). Controls minute options displayed in picker. |

## Events

| Event          | Payload Type             | Description                              |
| -------------- | ------------------------ | ---------------------------------------- |
| `update:value` | `Date \| string \| null` | Emitted when the selected value changes. |
| `change`       | `Date \| string \| null` | Emitted when the selected value changes. |
| `select`       | `Date \| string \| null` | Emitted when a date/time is selected.    |

## Events - TimePicker

| Event               | Payload Type | Description                             |
| ------------------- | ------------ | --------------------------------------- |
| `update:modelValue` | `string`     | Emitted when the selected time changes. |

## Minute Interval Configuration

The `minuteInterval` prop allows you to customize the minute options displayed in both the TimePicker and DatePicker (when in `dateTime` or `time` mode). This is useful for:

- **Scheduling applications**: Set 15 or 30-minute intervals for appointment booking
- **Time tracking**: Use 5 or 10-minute intervals for precise time logging
- **Simplified selection**: Use 60-minute intervals to show only full hours

### Examples:

```vue
<!-- 5-minute intervals: 00, 05, 10, 15, ... 55 -->
<DatePicker mode="dateTime" :minute-interval="5" />

<!-- 10-minute intervals: 00, 10, 20, 30, ... 50 -->
<TimePicker :minute-interval="10" />

<!-- 15-minute intervals: 00, 15, 30, 45 -->
<DatePicker mode="time" :minute-interval="15" />

<!-- 30-minute intervals: 00, 30 -->
<TimePicker :minute-interval="30" />

<!-- 60-minute intervals: Only 00 (full hours) -->
<DatePicker mode="dateTime" :minute-interval="60" />

<!-- 1-minute intervals (default): 00, 01, 02, ... 59 -->
<TimePicker :minute-interval="1" />
```

## Styling

Customize the appearance using the following CSS variables defined in `style.css`:

```css
:root {
   --date-picker-primary: #2d66ed;
   --date-picker-primary-fg: #ffffff;
   --date-picker-text: inherit;
   --date-picker-border: #00000020;
   --date-picker-secondary: #00000010;
   --date-picker-hover: #00000010;
   --date-picker-disabled: #000000b4;
   --date-picker-today: #00000010;
   --date-picker-radius: 0.375em;
   --timer-picker-bg: white;
   --timer-picker-input-bg: transparent;
   --timer-picker-input-border: #00000020;
   --timer-picker-input-text: inherit;
   --timer-picker-input-text-size: 0.875em;
   --timer-picker-input-border-radius: 0.375em;
   --timer-picker-input-padding: 0.5em 0.75em;
}
```

## Author

[safdar-azeem](https://github.com/safdar-azeem)
