<!-- https://svelte.dev/repl/92058b31e5424fc09b476795bb6cc59a?version=3.24.0 -->
<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { storePoi } from '../../stores';
	import { getPoi } from '../fetch';
	import MapToolbar from '../components/MapToolbar.svelte';

	let circleA = [];
	let map;
	let poi;

	onMount(async () => {
		// define color
		poi = await (await getPoi()).json();
		const color = import.meta.env.VITE_COLOR_PALLET.split(',');

		let x = [];
		poi.forEach((p, index) => {
			p.color = '#' + color[index];

			x.push(p);
		});
		// assign POI
		$storePoi = [x];

		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet.map('map').setView([45, -102], 5);
			leaflet
				.tileLayer(
					'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
					{
						maxZoom: 14,
						id: 'mapbox/streets-v11',
						tileSize: 512,
						zoomOffset: -1
					}
				)
				.addTo(map);

			let poi = $storePoi[0];
			createCircle(map, poi);

			let toolbar = L.control({ position: 'bottomleft' });
			toolbar.onAdd = (map) => {
				let div = L.DomUtil.create('div');
				let toolbarComponent = new MapToolbar({
					target: div,
					props: {
						resetMarker: () => resetCircle(),
						selectPoi: (id) => selectPoi(id)
					}
				});

				return div;
			};

			toolbar.addTo(map);
		}
	});
	function createCircle() {
		poi.forEach((p) => {
			createSingleCircle(p);
		});
	}

	function createSingleCircle(d, rad = 100000) {
		circleA[d.poi_id] = L.circle([d.lat, d.lon], rad, {
			id: `pane_${d.id}`,
			color: '#eee',
			fillColor: d.color,
			fillOpacity: 0.5
		})
			.addTo(map)
			.bindPopup(`<b>${d.name}</b>`);
	}
	function selectPoi(id) {
		// remove except selected
		circleA.forEach((p, i) => {
			circleA[i].removeFrom(map);
		});
		createSingleCircle(id, 10000);

		map.setView([id.lat, id.lon], 10);
	}
	function resetCircle() {
		createCircle();
		map.setView([45, -102], 5);
	}
</script>

<main>
	<div id="map" style="z-index: 0;" />
</main>

<style>
	@import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
	main #map {
		height: 500px;
	}
</style>
