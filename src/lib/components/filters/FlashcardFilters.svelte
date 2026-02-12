<script lang="ts">
  interface Props {
    categories: Map<string, number>;
    selectedCategories: string[];
    hideMasteredCards: boolean;
    onShuffle: () => void;
  }

  let {
    categories,
    selectedCategories = $bindable(),
    hideMasteredCards = $bindable(),
    onShuffle,
  }: Props = $props();

  let showAllCategories = $state(false);
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
          {#each categories as category}
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
    onclick={onShuffle}
  >
    <img src="/images/icon-shuffle.svg" alt="Shuffle" aria-hidden="true" />
    Shuffle
  </button>
</div>

<style>
  .select {
    background-color: var(--neutral-0);
  }
  button {
    background-color: var(--neutral-0);
  }
</style>
