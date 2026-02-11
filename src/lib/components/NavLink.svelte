<script lang="ts">
	import { page } from '$app/stores';

	let { href, children } = $props();

	const isActive = $derived($page.url.pathname === href);
</script>

<li class="list-none">
	<a
		{href}
		class="text-preset-4-medium block rounded-full px-4 py-2 transition-colors"
		class:border={isActive}
		class:border-neutral-900={isActive}
		class:bg-yellow-500={isActive}>{@render children()}</a
	>
</li>
