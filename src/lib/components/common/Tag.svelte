<script lang="ts">
	interface Props {
		label: string;
		class?: string;
	}

	let { label, class: className = '' }: Props = $props();
</script>

<div class="tag text-preset-6 rounded-full border border-neutral-900 px-2 py-1 {className}">
	{label}
</div>

<style>
	.tag {
		background-color: var(--neutral-0);
	}
</style>
