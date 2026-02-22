<script lang="ts">
  import { flashcardCategories, flashcardStore } from '$lib/stores/flashcards';
  import Card from '../common/Card.svelte';
  import Divider from '../common/Divider.svelte';
  import FlashcardFilters from '../filters/FlashcardFilters.svelte';
  import Button from '../common/Button.svelte';
  import { goto } from '$app/navigation';

  const flashcards = $derived($flashcardStore);
  const categories = $derived(flashcardCategories);

  let selectedCategories = $state<string[]>([]);
  let hideMasteredCards = $state(false);

  const handleShuffle = () => {};
</script>

<Card>
  <FlashcardFilters
    categories={$categories}
    bind:selectedCategories
    bind:hideMasteredCards
    onShuffle={handleShuffle}
    class="p-5"
  />
  <Divider orientation="horizontal" />
  {#if flashcards.length === 0 || true}
    <div class="flex flex-col items-center justify-center gap-8 p-5 md:min-h-[500px]">
      <div class="flex flex-col items-center justify-center gap-2">
        <p class="text-preset-2 text-neutral-900">No cards to study</p>
        <p class="text-preset-4 text-neutral-600">
          You don’t have any cards yet. Add your first card in the All Cards tab.
        </p>
      </div>
      <Button
        style="secondary"
        type="link"
        label="Go to All Cards"
        onclick={() => {
          goto('/all-cards');
        }}
      />
    </div>
  {/if}
</Card>
