<script>
	import DatePicker from './DatePicker.svelte';
	import { storeDateRange } from '../../stores';
	import { getWeekPeriod } from '../functions';
</script>

<div class="bg-white shadow rounded-lg p-2 sm:p-2 xl:p-3  2xl:col-span-2">
	<div class="grid gap-6 md:grid-cols-3">
		<div><DatePicker /></div>
		<div class="col-span-2 py-2 font-semibold">
			{getWeekPeriod($storeDateRange)}
		</div>
	</div>
	<div><slot /></div>
</div>
