<script lang="ts">
  interface Props {
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }

  let { orientation = 'horizontal', class: className = '' }: Props = $props();
</script>

<div
  class="divider {orientation} {className}"
  role="separator"
  aria-orientation={orientation}
></div>

<style>
  .divider {
    background-color: var(--neutral-600);
  }

  .horizontal {
    width: 100%;
    height: 1px;
  }

  .vertical {
    width: 1px;
    min-height: 1rem; /* Visible même sans parent avec hauteur */
    align-self: stretch; /* S'étire dans un contexte flex */
  }
</style>
