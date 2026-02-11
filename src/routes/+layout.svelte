<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	let { children } = $props();
</script>

<div class="app-container flex flex-col gap-4 bg-neutral-100">
	<Navbar />
	<main>
		{@render children()}
	</main>
</div>
