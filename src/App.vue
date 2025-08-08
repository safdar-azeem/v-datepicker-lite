<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from './DatePicker/DatePicker.vue'

const dateValue = ref<Date | null>(null)
const weekValue = ref<Date | null>(null)
const monthValue = ref<Date | null>(null)
const dateTimeValue = ref<Date | null>(null)
</script>

<template>
	<div
		style="
			padding: 2em;
			max-width: 400px;
			margin: 0 auto;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
				sans-serif;
		">
		<h1 style="margin-bottom: 0.5em; color: #374151">
			Vue Datepicker Lite
		</h1>

		<div style="display: grid; gap: 2em">
			<div>
				<h3 style="margin-bottom: 0.5em; color: #374151">Date Mode</h3>
				<DatePicker
					class="date-picker-container"
					v-model:value="dateValue"
					mode="date" />
				<p
					style="
						margin-top: 0.5em;
						color: #6b7280;
						font-size: 0.875em;
					">
					Selected:
					{{ dateValue ? dateValue.toLocaleDateString() : 'None' }}
				</p>
			</div>

			<div>
				<h3 style="margin-bottom: 0.5em; color: #374151">Week Mode</h3>
				<DatePicker
					class="date-picker-container"
					v-model:value="weekValue"
					mode="week" />
				<p
					style="
						margin-top: 0.5em;
						color: #6b7280;
						font-size: 0.875em;
					">
					Selected:
					{{ weekValue ? weekValue.toLocaleDateString() : 'None' }}
				</p>
			</div>

			<div>
				<h3 style="margin-bottom: 0.5em; color: #374151">Month Mode</h3>
				<DatePicker
					class="date-picker-container"
					v-model:value="monthValue"
					mode="month" />
				<p
					style="
						margin-top: 0.5em;
						color: #6b7280;
						font-size: 0.875em;
					">
					Selected:
					{{ monthValue ? monthValue.toLocaleDateString() : 'None' }}
				</p>
			</div>

			<div>
				<h3 style="margin-bottom: 0.5em; color: #374151">
					DateTime Mode - Enhanced
				</h3>
				<DatePicker
					class="date-picker-container-wide"
					v-model:value="dateTimeValue"
					mode="dateTime"
					time-format="12h" />
				<p
					style="
						margin-top: 0.5em;
						color: #6b7280;
						font-size: 0.875em;
					">
					Selected:
					{{
						dateTimeValue ? dateTimeValue.toLocaleString() : 'None'
					}}
				</p>
			</div>

			<div>
				<h3 style="margin-bottom: 0.5em; color: #374151">
					With Restrictions
				</h3>
				<DatePicker
					class="date-picker-container"
					mode="date"
					:min-date="new Date().toISOString().split('T')[0]"
					:disabled-dates="[
						{ start: '2025-08-15', end: '2025-08-20' },
						{ start: '2025-08-25' },
					]" />
				<p
					style="
						margin-top: 0.5em;
						color: #6b7280;
						font-size: 0.875em;
					">
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
