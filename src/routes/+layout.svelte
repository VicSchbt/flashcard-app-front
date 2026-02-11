<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<div class="app-container bg-neutral-100">
	<Navbar />
	<main>
		{@render children()}
	</main>
</div>
