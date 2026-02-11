<script lang="ts">
	import { flashcardStore } from '$lib/stores/flashcards';
	import FlashcardCard from './FlashcardCard.svelte';

	const flashcards = $derived($flashcardStore);
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each flashcards as flashcard}
		<FlashcardCard {flashcard} />
	{/each}
</div>
