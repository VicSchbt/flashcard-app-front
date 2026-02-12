<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className = '' }: Props = $props();
</script>

<div class="card rounded-lg border border-neutral-900 shadow-sm {className}">
  {@render children()}
</div>

<style>
  .card {
    background-color: var(--neutral-0);
  }
</style>
