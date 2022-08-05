<script>
	import Chart from './ApexChart.svelte';
	import { chartSeries } from '../../stores';
	import _ from 'lodash';
	// import { getHourlyReport } from '../fetch';

	let options = {
		series: [
			{
				name: 'Revenue',
				type: 'column',
				data: []
			},
			{
				name: 'Impressions',
				type: 'line',
				data: []
			},
			{
				name: 'Clicks',
				type: 'column',
				data: []
			}
		],
		chart: {
			height: 200,
			type: 'line',
			stacked: false
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: [1, 1, 4]
		},
		title: {
			text: 'Daily Performance',
			align: 'left',
			offsetX: 110
		},
		xaxis: {
			categories: []
		},
		yaxis: [
			{
				axisTicks: {
					show: true
				},
				axisBorder: {
					show: true,
					color: '#008FFB'
				},
				labels: {
					style: {
						colors: '#008FFB'
					}
				},
				title: {
					text: 'Revenue',
					style: {
						color: '#008FFB'
					}
				},
				tooltip: {
					enabled: true
				}
			},
			{
				seriesName: 'Revenue',
				opposite: true,
				axisTicks: {
					show: true
				},
				axisBorder: {
					show: true,
					color: '#00E396'
				},
				labels: {
					style: {
						colors: '#00E396'
					}
				},
				title: {
					text: 'Impressions',
					style: {
						color: '#00E396'
					}
				}
			},
			{
				seriesName: 'Clicks',
				opposite: true,
				axisTicks: {
					show: true
				},
				axisBorder: {
					show: true,
					color: '#FEB019'
				},
				labels: {
					style: {
						colors: '#FEB019'
					}
				},
				title: {
					text: 'Clicks',
					style: {
						color: '#FEB019'
					}
				}
			}
		],
		tooltip: {
			fixed: {
				enabled: true,
				// position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60
			}
		},
		legend: {
			horizontalAlign: 'left',
			offsetX: 40
		}
	};

	$: $chartSeries, run();

	function run() {
		if ($chartSeries.label.length > 0) {
			updateSeries($chartSeries);
		}
	}

	function updateSeries(data) {
		options.series = [
			{
				name: 'Revenue',
				type: 'column',
				data: data.revenue
			},
			{
				name: 'Impressions',
				type: 'line',
				data: data.impressions
			},
			{
				name: 'Clicks',
				type: 'column',
				data: data.clicks
			}
		];

		options.xaxis.categories = data.label;
	}
</script>

<main style="min-height: 50px">
	<Chart {options} />
</main>
