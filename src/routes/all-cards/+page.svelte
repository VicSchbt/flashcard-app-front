<script lang="ts">
  import FlashcardList from '$lib/components/Cards/FlashcardList.svelte';
  import { onMount } from 'svelte';
  import { flashcardStore } from '$lib/stores/flashcards';
  import AddFlashcardForm from '$lib/components/forms/AddFlashcardForm.svelte';

  onMount(() => {
    flashcardStore.load();
  });
</script>

<AddFlashcardForm />
<FlashcardList />
