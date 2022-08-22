<script>
	import { onMount } from 'svelte';
	import ItemIndicator from '../lib/components/ItemIndicator.svelte';
	import Box from '../lib/components/Box.svelte';
	import BoxRight from '../lib/components/BoxRight.svelte';
	import ChartTrend from '../lib/components/ChartTrend.svelte';
	import MapPoi from '../lib/components/MapPoi.svelte';

	// import { fetchHourly } from '../lib/functions';

	import { storePoi, storeHourly, storeDateRange } from '../stores';
	// import { getPoi, getHourlyReport } from '../lib/fetch';
	import ChartHourly from '../lib/components/ChartHourly.svelte';

	onMount(async () => {
		// fetchHourly();
		// $storePoi = [[...(await (await getPoi()).json())]];
		// $storeHourly = [[...(await (await getHourlyReport($storeDateRange[0])).json())]];
	});
</script>

<main>
	<div class="pt-1 px-4 mb-5 h-full">
		<div class="w-full grid grid-cols-1 mb-3 md:grid-cols-2 xl:grid-cols-3 gap-4">
			<ItemIndicator />
		</div>
		<div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
			<Box>
				<MapPoi />
				<div class="mt-5">
					<ChartTrend />
				</div>
			</Box>
			<BoxRight>
				<ChartHourly />
			</BoxRight>
		</div>
	</div>
</main>
