<script setup lang="ts">
import { computed } from 'vue'
import type { MonthData } from './types'
import { datePickerGetMonthsData } from './utils'

interface Props {
	currentDate: Date
	selectedDate: Date | null
}

interface Emits {
	(e: 'select', year: number): void
	(e: 'month-select', month: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentYear = computed(() => props.currentDate.getFullYear())
const selectedYear = computed(() => props.selectedDate?.getFullYear())

const yearRange = computed(() => {
	const start = Math.floor(currentYear.value / 10) * 10
	return Array.from({ length: 12 }, (_, i) => start + i - 1)
})

const monthsData = computed<MonthData[]>(() => {
	return datePickerGetMonthsData(currentYear.value).map((month) => ({
		...month,
		isSelected: props.selectedDate
			? month.month === props.selectedDate.getMonth() &&
			  month.year === props.selectedDate.getFullYear()
			: false,
	}))
})

const monthRows = computed(() => {
	const rows: MonthData[][] = []
	for (let i = 0; i < monthsData.value.length; i += 3) {
		rows.push(monthsData.value.slice(i, i + 3))
	}
	return rows
})

const selectYear = (year: number) => {
	emit('select', year)
}

const selectMonth = (monthData: MonthData) => {
	emit('month-select', monthData.month)
}
</script>

<template>
	<div class="year-view-layout">
		<!-- Years Section (25%) -->
		<div class="years-section">
			<div class="years-list">
				<button
					v-for="year in yearRange"
					:key="year"
					:class="[
						'year-item',
						{
							selected: year === selectedYear,
							current: year === currentYear,
						},
					]"
					@click="selectYear(year)">
					{{ year }}
				</button>
			</div>
		</div>

		<!-- Months Section (75%) -->
		<div class="months-section">
			<table class="date-picker-table date-picker-months-table">
				<tbody class="date-picker-months-body">
					<tr
						v-for="(monthRow, rowIndex) in monthRows"
						:key="rowIndex"
						class="date-picker-months-row">
						<td
							v-for="month in monthRow"
							:key="month.month"
							class="date-picker-month-cell">
							<button
								:class="[
									'date-picker-month',
									{
										selected: month.isSelected,
										disabled: month.isDisabled,
									},
								]"
								@click="selectMonth(month)"
								:disabled="month.isDisabled">
								{{ month.name.substring(0, 3) }}
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
