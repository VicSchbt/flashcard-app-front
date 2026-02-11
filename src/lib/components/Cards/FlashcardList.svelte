<script lang="ts">
	import { flashcardCategories, flashcardStore } from '$lib/stores/flashcards';
	import FlashcardCard from './FlashcardCard.svelte';

	const flashcards = $derived($flashcardStore);
	const categories = $derived(flashcardCategories);
	let selectedCategories = $state<string[]>([]);
	const filteredFlashcards = $derived(
		flashcards.filter(
			(flashcard) =>
				selectedCategories.length === 0 || selectedCategories.includes(flashcard.category)
		)
	);

	let showAllCategories = $state(false);
</script>

<div class="relative flex items-center justify-between">
	<button
		type="button"
		class="text-preset-5 flex cursor-pointer gap-2 rounded-full border border-neutral-900 px-4 py-3"
		onclick={() => (showAllCategories = !showAllCategories)}
		>All Categories
		<img src="/images/icon-chevron-down.svg" alt="Arrow Down" aria-hidden="true" />
	</button>
	{#if showAllCategories}
		<div
			class="select absolute top-[120%] left-0 z-10 flex flex-col rounded-lg border border-neutral-900"
		>
			{#each $categories as category}
				<label
					class="text-preset-5 flex items-center gap-2 border-b border-neutral-900 px-4 py-2 last:border-b-0 hover:bg-neutral-100"
				>
					<input type="checkbox" value={category[0]} bind:group={selectedCategories} />
					{category[0]} <span class="opacity-60">({category[1]})</span>
				</label>
			{/each}
		</div>
	{/if}
</div>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each filteredFlashcards as flashcard}
		<FlashcardCard {flashcard} />
	{/each}
</div>

<style>
	.select {
		background-color: var(--neutral-0);
	}
	button {
		background-color: var(--neutral-0);
	}
</style>
