<script lang="ts">
  import { flashcardCategories, flashcardStore } from '$lib/stores/flashcards';
  import type { Flashcard } from '$lib/types';
  import FlashcardCard from './FlashcardCard.svelte';
  import { shuffleArray } from '$lib/utils';
  import ConfirmationDialog from '../dialog/ConfirmationDialog.svelte';
  import EditFlashcardDialog from '../dialog/EditFlashcardDialog.svelte';
  import type { ActionData } from '../../../routes/all-cards/$types';
  import FlashcardFilters from '../filters/FlashcardFilters.svelte';

  interface Props {
    form: ActionData;
  }

  let { form }: Props = $props();

  const flashcards = $derived($flashcardStore);
  const categories = $derived(flashcardCategories);

  let selectedCategories = $state<string[]>([]);
  let hideMasteredCards = $state(false);
  let displayedFlashcards = $state<Flashcard[]>([]);
  let deleteDialogOpen = $state(false);
  let editDialogOpen = $state(false);
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
    deleteDialogOpen = false;
    selectedFlashcard = null;
  };
</script>

<FlashcardFilters
  categories={$categories}
  bind:selectedCategories
  bind:hideMasteredCards
  onShuffle={handleShuffle}
/>

<!-- Cards -->
{#if displayedFlashcards.length > 0}
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each displayedFlashcards as flashcard}
      <FlashcardCard
        {flashcard}
        onEdit={() => {
          editDialogOpen = true;
          selectedFlashcard = flashcard;
        }}
        onDelete={() => {
          deleteDialogOpen = true;
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
  isOpen={deleteDialogOpen}
  title="Delete this card?"
  description="This action can’t be undone."
  confirmText="Delete Card"
  cancelText="Cancel"
  onConfirm={handleDelete}
  onCancel={() => (deleteDialogOpen = false)}
/>

<EditFlashcardDialog
  isOpen={editDialogOpen}
  flashcardId={selectedFlashcard?.id}
  initialValues={selectedFlashcard
    ? {
        question: selectedFlashcard.question,
        answer: selectedFlashcard.answer,
        category: selectedFlashcard.category,
      }
    : undefined}
  bind:form
  onSuccess={() => {
    flashcardStore.load();
    editDialogOpen = false;
    selectedFlashcard = null;
  }}
  onCancel={() => {
    editDialogOpen = false;
    selectedFlashcard = null;
  }}
/>
