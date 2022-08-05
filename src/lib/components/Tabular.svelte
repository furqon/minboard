<script>
	import { onMount, afterUpdate } from 'svelte';
	import { TabulatorFull as Tabulator } from 'tabulator-tables';
	import 'tabulator-tables/dist/css/tabulator_simple.min.css';
	export let data24;

	let tableComponent;

	export let tableColumns;
	let tableDiv;

	tableColumns = [
		{ title: 'Date', field: 'datein', sorter: 'number' },
		{ title: 'Hour', field: 'hour' },
		{ title: 'Impressions', field: 'impressions', formatter: 'money' },
		{ title: 'Clicks', field: 'clicks', formatter: 'money' },
		{ title: 'Revenue', field: 'revenue', formatter: 'money' },
		{ title: 'POI Id', field: 'poi_id' }
	];

	onMount(async function () {
		tableComponent = new Tabulator(tableDiv, {
			data: data24, //link data to table
			autoColumns: true,
			reactiveData: true, //enable data reactivity
			columns: tableColumns, //define table columns
			pagination: 'local',
			paginationSize: 10,
			layout: 'fitDataFill'
		});
	});

	afterUpdate(() => {
		tableComponent.replaceData(data24);
	});
</script>

<main>
	<div class="h-noHeader-noFooter">
		<div bind:this={tableDiv} class="h-noHeader-noFooter" />
	</div>
</main>
