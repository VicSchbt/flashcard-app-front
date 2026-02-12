<script lang="ts">
  interface Props {
    progress: number;
    class?: string;
  }

  let { progress, class: className = '' }: Props = $props();
  const isMastered = $derived(progress >= 5);
</script>

<div class={className}>
  {#if isMastered}
    <div
      class=" mastered-badge flex w-fit gap-1.5 rounded-full border border-neutral-900 px-2 py-1"
    >
      <img src="/images/icon-mastered.svg" alt="Mastered" aria-hidden="true" />
      <p class="text-preset-6">Mastered</p>
      <p class="text-preset-6">{progress}/5</p>
    </div>
  {:else}
    <div class="flex items-center gap-2">
      <div class="progress-bar h-2 w-16 rounded-full border border-neutral-900">
        <div class="progress-bar-fill" style="width: {(progress / 5) * 100}%"></div>
      </div>
      <p class="text-preset-6 opacity-60">{progress}/5</p>
    </div>
  {/if}
</div>

<style>
  .progress-bar {
    background-color: var(--neutral-0);
  }

  .progress-bar-fill {
    background-color: var(--neutral-900);
    height: 100%;
    border-radius: inherit;
  }

  .mastered-badge {
    background-color: var(--teal-400);
  }
</style>
