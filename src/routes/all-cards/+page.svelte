<script lang="ts">
  import FlashcardList from '$lib/components/Cards/FlashcardList.svelte';
  import { onMount } from 'svelte';
  import { flashcardStore } from '$lib/stores/flashcards';
  import AddFlashcardForm from '$lib/components/forms/AddFlashcardForm.svelte';
  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();

  onMount(() => {
    flashcardStore.load();
  });
</script>

<AddFlashcardForm
  bind:form
  onSuccess={() => {
    flashcardStore.load();
  }}
/>
<FlashcardList />
