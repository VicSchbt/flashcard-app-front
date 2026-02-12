<script lang="ts">
  import { flashcardCategories, flashcardStore } from '$lib/stores/flashcards';
  import type { Flashcard } from '$lib/types';
  import FlashcardCard from './FlashcardCard.svelte';
  import { shuffleArray } from '$lib/utils';
  import ConfirmationDialog from '../dialog/ConfirmationDialog.svelte';

  const flashcards = $derived($flashcardStore);
  const categories = $derived(flashcardCategories);

  let selectedCategories = $state<string[]>([]);
  let hideMasteredCards = $state(false);
  let showAllCategories = $state(false);
  let displayedFlashcards = $state<Flashcard[]>([]);
  let dialogOpen = $state(false);
  let selectedFlashcard: Flashcard | null = $state(null);

  const filteredFlashcards = $derived(
    flashcards.filter((flashcard) => {
      const isNotMastered = !hideMasteredCards || flashcard.knownCount < 5;
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(flashcard.category);
      return isNotMastered && matchesCategory;
    }),
  );

  $effect(() => {
    displayedFlashcards = filteredFlashcards;
  });

  const handleShuffle = () => {
    displayedFlashcards = shuffleArray(filteredFlashcards);
  };

  const handleDelete = () => {
    if (!selectedFlashcard) return;
    flashcardStore.delete(selectedFlashcard.id);
    dialogOpen = false;
    selectedFlashcard = null;
  };
</script>

<div class="flex justify-between">
  <!-- Filters -->
  <div class="filters flex flex-col gap-2.5 md:flex-row">
    <div class="relative">
      <button
        type="button"
        class="text-preset-4-medium flex cursor-pointer gap-2 rounded-full border border-neutral-900 px-4 py-3"
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
    <label class="text-preset-4-medium flex items-center gap-2">
      <input type="checkbox" bind:checked={hideMasteredCards} />
      Hide Mastered
    </label>
  </div>
  <button
    type="button"
    class="text-preset-4-medium flex cursor-pointer gap-2 self-start rounded-full border border-neutral-900 px-4 py-3"
    onclick={handleShuffle}
  >
    <img src="/images/icon-shuffle.svg" alt="Shuffle" aria-hidden="true" />
    Shuffle
  </button>
</div>

<!-- Cards -->
{#if displayedFlashcards.length > 0}
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each displayedFlashcards as flashcard}
      <FlashcardCard
        {flashcard}
        onEdit={() => {}}
        onDelete={() => {
          dialogOpen = true;
          selectedFlashcard = flashcard;
        }}
      />
    {/each}
  </div>
{:else}
  <div class="flex flex-col gap-3">
    <p class="text-preset-2">No cards yet</p>
    <p class="text-preset-4">Add your first card using the form above and it will show up here.</p>
  </div>
{/if}

<ConfirmationDialog
  isOpen={dialogOpen}
  title="Delete this card?"
  description="This action can’t be undone."
  confirmText="Delete Card"
  cancelText="Cancel"
  onConfirm={handleDelete}
  onCancel={() => (dialogOpen = false)}
/>

<style>
  .select {
    background-color: var(--neutral-0);
  }
  button {
    background-color: var(--neutral-0);
  }
</style>
