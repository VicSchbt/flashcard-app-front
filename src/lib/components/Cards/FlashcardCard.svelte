<script lang="ts">
  import Card from '../common/Card.svelte';
  import Divider from '../common/Divider.svelte';
  import Tag from '../common/Tag.svelte';
  import ProgressionBar from './ProgressionBar.svelte';
  import type { Flashcard } from '$lib/types';

  interface Props {
    flashcard: Flashcard;
    onEdit: () => void;
    onDelete: () => void;
  }

  let { flashcard, onEdit, onDelete }: Props = $props();

  let isActionMenuOpen = $state(false);
</script>

<Card class="flex flex-col">
  <h3 class="text-preset-3 p-4 font-semibold">{flashcard.question}</h3>
  <Divider orientation="horizontal" />
  <div class="flex flex-1 flex-col gap-2 p-4">
    <p class="text-preset-5 opacity-60">Answer:</p>
    <p class="text-preset-4">{flashcard.answer}</p>
  </div>
  <Divider orientation="horizontal" />
  <div class="flex items-center gap-2 px-4">
    <Tag label={flashcard.category} class="my-3" />
    <Divider orientation="vertical" />
    <ProgressionBar progress={flashcard.knownCount} class="flex-1" />
    <Divider orientation="vertical" />
    <div class="relative">
      <button
        type="button"
        aria-label="See more"
        class="flex items-center justify-center"
        onclick={() => (isActionMenuOpen = !isActionMenuOpen)}
      >
        <img src="/images/icon-menu.svg" alt="See more" aria-hidden="true" />
      </button>
      {#if isActionMenuOpen}
        <ul class="action absolute z-10 flex flex-col rounded-lg border border-neutral-900">
          <li>
            <button
              type="button"
              aria-label="Edit"
              class="text-preset-5 flex items-center gap-2 px-4 py-2"
              onclick={() => {
                onEdit();
                isActionMenuOpen = false;
              }}
            >
              <img src="/images/icon-edit.svg" alt="Edit" aria-hidden="true" />
              Edit
            </button>
          </li>
          <Divider orientation="horizontal" />
          <li>
            <button
              type="button"
              aria-label="Delete"
              class="text-preset-5 flex items-center gap-2 px-4 py-2"
              onclick={() => {
                onDelete();
                isActionMenuOpen = false;
              }}
            >
              <img src="/images/icon-delete.svg" alt="Delete" aria-hidden="true" />
              Delete
            </button>
          </li>
        </ul>
      {/if}
    </div>
  </div>
</Card>

<style>
  .action {
    background-color: var(--neutral-0);
    min-width: 140px;
    bottom: 170%;
    right: -50%;
    box-shadow: 0 3px 8px 0 rgba(46, 20, 1, 0.2);
  }
</style>
