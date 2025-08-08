# Vue DatePicker

A lightweight and customizable Vue 3 date picker component with support for date, time, date-time, week, and month selection modes, featuring accessibility and responsive design.

## Features

-  **Multiple Selection Modes**: Supports `date`, `time`, `dateTime`, `week`, and `month` modes.
-  **Responsive Design**: Adapts to various screen sizes with a clean, modern UI.
-  **Accessibility**: Includes ARIA attributes and keyboard navigation for enhanced usability.
-  **Customizable**: Flexible props for date format, time format, min/max dates, disabled dates, and more.
-  **Time Selection**: Supports 12h/24h formats with customizable time intervals (15, 30, or 60 minutes).
-  **Performance Optimized**: Uses Vue 3 composition API for efficient rendering and state management.
-  **TypeScript Support**: Fully typed with TypeScript for better developer experience.

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

## Usage

Below are examples demonstrating different configurations of the Vue DatePicker component.

### 1. Basic Date Picker

A simple date picker for selecting a single date.

```vue
<script setup>
import { ref } from 'vue'
import DatePicker from 'v-datepicker-lite'
import 'v-datepicker-lite/style.css'

const selectedDate = (ref < Date) | (null > null)
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

const selectedWeek = (ref < Date) | (null > null)
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

const selectedMonth = (ref < Date) | (null > null)
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

### 4. DateTime Picker

Select both date and time with a 12-hour format.

```vue
<script setup>
import { ref } from 'vue'
import DatePicker from 'v-datepicker-lite'

const selectedDateTime = (ref < Date) | (null > null)
</script>

<template>
   <div>
      <h3>DateTime Picker</h3>
      <DatePicker
         v-model:value="selectedDateTime"
         mode="dateTime"
         time-format="12h"
         time-interval="15" />
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

const selectedDate = (ref < Date) | (null > null)
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

## Props

| Prop            | Type                     | Default        | Description                                                       |
| --------------- | ------------------------ | -------------- | ----------------------------------------------------------------- |
| `value`         | `Date \| string \| null` | `null`         | v-model binding for the selected date/time.                       |
| `mode`          | `string`                 | `'date'`       | Selection mode: `date`, `time`, `dateTime`, `week`, or `month`.   |
| `format`        | `string`                 | `'YYYY-MM-DD'` | Date format for string output (e.g., `YYYY-MM-DD HH:mm`).         |
| `timeFormat`    | `string`                 | `'24h'`        | Time format: `12h` or `24h`.                                      |
| `timeInterval`  | `number`                 | `15`           | Time selection interval in minutes: `15`, `30`, or `60`.          |
| `minDate`       | `string`                 | `undefined`    | Minimum selectable date (ISO format: `YYYY-MM-DD`).               |
| `maxDate`       | `string`                 | `undefined`    | Maximum selectable date (ISO format: `YYYY-MM-DD`).               |
| `disabledDates` | `Array`                  | `[]`           | Array of disabled date ranges: `{ start: string, end?: string }`. |
| `disabled`      | `boolean`                | `false`        | Disables the date picker.                                         |
| `readonly`      | `boolean`                | `false`        | Makes the date picker read-only.                                  |

## Events

| Event          | Payload Type             | Description                              |
| -------------- | ------------------------ | ---------------------------------------- |
| `update:value` | `Date \| string \| null` | Emitted when the selected value changes. |
| `change`       | `Date \| string \| null` | Emitted when the selected value changes. |
| `select`       | `Date \| string \| null` | Emitted when a date/time is selected.    |

## Styling

Customize the appearance using the following CSS variables defined in `style.css`:

```css
:root {
   --date-picker-primary: #4f46e5; /* Primary color for selected items */
   --date-picker-primary-fg: #ffffff; /* Foreground color for selected items */
   --date-picker-text: #374151; /* Text color */
   --date-picker-border: #d1d5db; /* Border color */
   --date-picker-secondary: #f7f7f9; /* Secondary background color */
   --date-picker-disabled: #9ca3af; /* Disabled item color */
   --date-picker-today: #fef3c7; /* Today highlight color */
   --date-picker-radius: 0.375em; /* Border radius */
   --date-picker-hover: #f3f4f6; /* Hover background color */
}
```

## Author

[safdar-azeem](https://github.com/safdar-azeem)

## License

MIT
