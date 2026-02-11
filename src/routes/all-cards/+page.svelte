<script lang="ts">
	import FlashcardList from '$lib/components/Cards/FlashcardList.svelte';
	import { onMount } from 'svelte';
	import { flashcardStore } from '$lib/stores/flashcards';

	onMount(() => {
		flashcardStore.load();
	});
</script>

<FlashcardList />
