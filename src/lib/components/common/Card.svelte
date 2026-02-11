<script lang="ts">
	let { children } = $props();
</script>

<div class="card rounded-lg border border-neutral-900 shadow-sm">
	{@render children()}
</div>

<style>
	.card {
		background-color: var(--neutral-0);
	}
</style>
