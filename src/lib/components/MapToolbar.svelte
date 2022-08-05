<!-- https://akashmittal.com/svelte-calling-function-child-parent/ -->
<script>
	import Chart from '../components/ApexChart.svelte';
	import { storePoi } from '../../stores';
	import { storeHourly } from '../../stores';
	import _ from 'lodash';

	let poi_id = 1;
	export let selectPoi = (poi_id) => {};
	export let resetMarker = () => {};

	let category = 'revenue';
	let byPoi = [];
	var poi = [];
	if ($storePoi.length > 0) {
		$storePoi[0].forEach((p, i) => {
			p.i = i;
			poi.push(p);
		});
	}

	$: $storeHourly, run();

	function run() {
		if ($storeHourly.length > 0) {
			updatePie();
		}
	}

	function getdata(dt = 0) {
		// if we want to be on daily basis, than datasum have to be filtered by date
		let datasum = $storeHourly[0];

		byPoi = _(datasum)
			.groupBy('poi_id')
			.map((poi_id, id) => ({
				poi_id: id,
				revenue: _.sumBy(poi_id, 'revenue'),
				clicks: _.sumBy(poi_id, 'clicks'),
				impressions: _.sumBy(poi_id, 'impressions')
			}))
			.value();

		return byPoi;
	}

	function updatePie() {
		let data = getdata();
		options.series = _.map(data, category);
	}

	var options = {
		series: [1, 1, 1, 1],
		colors: ['#293462', '#D61C4E', '#FEB139', '#FFF80A'],

		chart: {
			width: 380,
			type: 'pie',
			events: {
				dataPointSelection: function (event, chartContext, config) {
					var idx = config.dataPointIndex;
					selectPoi(_.filter(poi, { i: idx })[0]);
				}
			}
		},
		labels: _.map(poi, 'name'),
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		]
	};
</script>

<!-- 
This mousedown handler prevents Leaflet from scrolling the
map while we are moving the range slider.
-->
<div on:mousedown|stopPropagation={() => {}}>
	<div class="grid md:grid-cols-3">
		<div class="col-span-2">
			<select
				bind:value={category}
				on:change={updatePie}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2"
			>
				<option value="revenue">Revenue</option>
				<option value="impressions">Impressions</option>
				<option value="clicks">Clicks</option>
			</select>
		</div>
		<div>
			<button type="button" class="p-1 text-sm dark:bg-blue-600" on:click={resetMarker}
				>Reset marker</button
			>
		</div>
	</div>
	<Chart {options} />
</div>

<style>
	div {
		background-color: rgba(180, 180, 180, 0.5);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
