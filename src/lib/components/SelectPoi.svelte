<script>
	import { storePoi, poiSelect } from '../../stores';
</script>

<select
	bind:value={$poiSelect}
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
>
	<option disabled selected value> -- select POI -- </option>
	{#if $storePoi.length > 0}
		<option value="0">All</option>
		{#each $storePoi[0] as p}
			<option value={p.poi_id}>{p.name}</option>
		{/each}
	{/if}
</select>
