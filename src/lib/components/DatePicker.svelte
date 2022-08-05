<script>
	import { onMount } from 'svelte';
	import Flatpickr from 'svelte-flatpickr';
	import { storeHourly, storeDateRange, chartSeries } from '../../stores';
	const defaultDate = import.meta.env.VITE_DEFAULT_DATE;
	import { getHourlyReport } from '../fetch';

	import { getStartEndDate } from '../functions';

	let fp;
	let dr;
	let date = defaultDate;

	onMount(async () => {
		dr = getStartEndDate(defaultDate);
		updateStore(dr);
	});

	async function updateStore(dr) {
		storeDateRange.set(dr);
		$storeHourly = [[...(await (await getHourlyReport(dr)).json())]];
	}

	const flatpickrOptions = {
		element: '#my-picker',
		enableTime: false,
		altInput: true,
		wrap: true,
		altFormat: 'F j, Y',
		dateFormat: 'Y-m-d',
		defaultDate: '2017-01-01',
		onClose: function (selectedDates, dateStr, instance) {
			dr = getStartEndDate(dateStr);
			updateStore(dr);
		},
		onOpen: function () {
			console.log('opened');
		}
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
	<link
		rel="stylesheet"
		type="text/css"
		href="https://npmcdn.com/flatpickr/dist/themes/material_blue.css"
	/>
</svelte:head>

<Flatpickr options={flatpickrOptions} bind:value={date} element="#my-picker" bind:fp>
	<div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg h-10">
		<div class="flatpickr relative" id="my-picker">
			<input
				type="text"
				placeholder="Select Date (Week).."
				data-input
				class="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm
      focus:outline-none focus:shadow-outline text-gray-600 font-medium"
			/>

			<div class="absolute top-0 right-0 px-3 py-2">
				<svg
					on:click={() => {
						if (fp) {
							fp.open();
						}
					}}
					class="h-6 w-6 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0
          00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</div>
		</div>
	</div>
</Flatpickr>
