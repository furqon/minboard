<script>
	import { afterUpdate } from 'svelte';
	import { chartSeries } from '../../stores';

	let amount = {};
	afterUpdate(async () => {
		if ($chartSeries.label.length > 0) {
			amount = $chartSeries;
		}
	});

	function toNumber(n) {
		return n.toLocaleString('en', {
			notation: 'compact',
			compactDisplay: 'short'
		});
	}
</script>

<div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
	<div class="flex items-center">
		<div class="flex-shrink-0">
			<span class="text-2xl sm:text-3xl leading-none font-bold text-blue-900"
				>{toNumber(amount.totalRevenue | 0)}
			</span>
			<h3 class="text-base font-normal text-blue-500">Weekly Revenue</h3>
		</div>
		<div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
			Avg {toNumber(amount.avgRevenue | 0)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</div>
	</div>
</div>
<div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
	<div class="flex items-center">
		<div class="flex-shrink-0">
			<span class="text-2xl sm:text-3xl leading-none font-bold text-blue-900"
				>{toNumber(amount.totalImpressions | 0)}</span
			>
			<h3 class="text-base font-normal text-blue-500">Weekly Impressions</h3>
		</div>
		<div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
			Avg {toNumber(amount.avgImpressions | 0)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
				/>
			</svg>
		</div>
	</div>
</div>
<div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
	<div class="flex items-center">
		<div class="flex-shrink-0">
			<span class="text-2xl sm:text-3xl leading-none font-bold text-blue-900"
				>{toNumber(amount.totalClicks | 0)}</span
			>
			<h3 class="text-base font-normal text-blue-500">Weekly Clicks</h3>
		</div>
		<div class="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
			Avg {toNumber(amount.avgClicks | 0)}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
				/>
			</svg>
		</div>
	</div>
</div>
