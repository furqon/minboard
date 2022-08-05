<script>
	import '../app.css';

	import Navbar from '../lib/components/Navbar.svelte';
</script>

<div>
	<div>
		<Navbar />
		<div class="flex overflow-hidden bg-white pt-12">
			<div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop" />
			<div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto">
				<slot />
			</div>
		</div>
	</div>
</div>
