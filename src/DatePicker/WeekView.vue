<script setup lang="ts">
import { computed } from 'vue'
import type { WeekData } from './types'
import {
	datePickerGetWeekData,
	datePickerDayNames,
	datePickerIsSameDay,
} from './utils'

interface Props {
	currentDate: Date
	selectedDate: Date | null
}

interface Emits {
	(e: 'select', weekStart: Date): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const weekData = computed<WeekData[]>(() => {
	const weeks = datePickerGetWeekData(
		props.currentDate.getFullYear(),
		props.currentDate.getMonth()
	)

	return weeks.map((week) => {
		const isSelected = props.selectedDate
			? week.days.some((day) =>
					datePickerIsSameDay(day.date, props.selectedDate!)
			  )
			: false

		return {
			...week,
			isSelected,
		}
	})
})

const selectWeek = (week: WeekData) => {
	const weekStart =
		week.days.find((day) => day.isCurrentMonth)?.date || week.days[0].date
	emit('select', weekStart)
}
</script>

<template>
	<div class="date-picker-content">
		<table
			class="date-picker-table date-picker-week-table"
			cellpadding="0"
			cellspacing="0">
			<thead>
				<tr class="date-picker-weekdays-row">
					<th class="date-picker-weekday date-picker-week-header">
						Wk
					</th>
					<th
						v-for="dayName in datePickerDayNames"
						:key="dayName">
						{{ dayName }}
					</th>
				</tr>
			</thead>
			<tbody class="date-picker-weeks-body">
				<tr
					v-for="week in weekData"
					:key="week.weekNumber"
					:class="[
						'date-picker-week-row',
						{
							selected: week.isSelected,
						},
					]"
					@click="selectWeek(week)">
					<td class="date-picker-week-number-cell">
						<div class="date-picker-week-number">
							{{ week.weekNumber }}
						</div>
					</td>
					<td
						v-for="day in week.days"
						:key="`${day.year}-${day.month}-${day.day}`"
						class="date-picker-day-cell">
						<button
							:class="[
								'date-picker-day',
								{
									'other-month': !day.isCurrentMonth,
									today: day.isToday,
								},
							]">
							{{ day.day }}
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
