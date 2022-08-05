<script>
	import Chart from './ApexChart.svelte';
	import _ from 'lodash';
	import { get24H, getDateRange } from '../functions';
	import { storeHourly, chartSeries } from '../../stores';
	import Tabular from './Tabular.svelte';
	let category = 'revenue';
	let selecteddate = 0;

	let dailyhourly = [];

	let dateselect = [];

	$: $storeHourly, run();
	function run() {
		if ($storeHourly.length > 0) {
			dateselect = getDateRange($storeHourly[0]);

			dailyhourly = $chartSeries.dailyhourly;
			updateData();
		}
	}

	function updateData() {
		let datadaily = dailyhourly[selecteddate];
		// amount
		let datax = [];
		datadaily.forEach((d) => {
			datax.push({ x: d.datelabel, y: d[category] });
		});
		options.series = [{ name: _.capitalize(category), data: datax }];
		options.title.text = 'Hourly ' + _.capitalize(category);
	}

	// paging
	function nxt() {
		if (selecteddate < 7) {
			selecteddate++;
			updateData();
		}
	}
	function prev() {
		if (selecteddate > 0) {
			selecteddate--;
			updateData();
		}
	}
	// chart
	let options = {
		series: [
			{
				name: 'Amount',
				data: get24H()
			}
		],
		chart: {
			height: 350,
			type: 'bar'
		},
		plotOptions: {
			bar: {
				borderRadius: 10,
				dataLabels: {
					position: 'top' // top, center, bottom
				}
			}
		},
		dataLabels: {
			enabled: true,
			formatter: function (val) {
				return Math.ceil(val);
			},
			offsetY: -20,
			style: {
				fontSize: '12px',
				colors: ['#304758']
			}
		},

		xaxis: {
			categories: get24H(),
			position: 'top',
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			tooltip: {
				enabled: true
			}
		},
		yaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		title: {
			text: `Hourly ${category}`,
			floating: true,
			offsetY: 330,
			align: 'center',
			style: {
				color: '#abc'
			}
		}
	};
</script>

<main>
	<Chart {options} />

	<div class="grid gap-6 mb-3 md:grid-cols-4">
		<div class="text-right">
			<button
				disabled={selecteddate === 0}
				on:click={prev}
				href="#"
				class="inline-flex items-center py-1 px-2 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  disabled:opacity-25"
			>
				<svg
					aria-hidden="true"
					class="mr-2 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
						clip-rule="evenodd"
					/></svg
				>
				Previous
			</button>
		</div>
		<div class="text-center">
			<select
				bind:value={category}
				on:change={updateData}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1"
			>
				<option value="revenue">Revenue</option>
				<option value="impressions">Impressions</option>
				<option value="clicks">Clicks</option>
			</select>
		</div>
		<div class="text-center">{dateselect[selecteddate]}</div>
		<div>
			<button
				disabled={selecteddate === 6}
				on:click={nxt}
				href="#"
				class="inline-flex items-center py-1 px-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  disabled:opacity-25"
			>
				Next
				<svg
					aria-hidden="true"
					class="ml-2 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
	</div>
</main>

<Tabular bind:data24={dailyhourly[selecteddate]} />
