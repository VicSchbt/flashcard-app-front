<script lang="ts">
  interface Props {
    type?: 'button' | 'submit' | 'reset';
    style?: 'primary' | 'secondary' | '';
    label: string;
    iconPath?: string;
    iconAlt?: string;
    class?: string;
  }

  let {
    type = 'button',
    style = '',
    label,
    iconPath,
    iconAlt,
    class: className = '',
  }: Props = $props();
</script>

<button
  {type}
  class="button text-preset-4-medium flex items-center gap-2 rounded-full px-5 py-3 {style} {className}"
>
  {#if iconPath}
    <img src={iconPath} alt={iconAlt ?? label} aria-hidden="true" />
  {/if}
  {label}
</button>

<style lang="scss">
  .button {
    background-color: var(--neutral-0);
    border: 1px solid var(--neutral-900);

    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: var(--neutral-100);
    }
    &:focus {
      box-shadow:
        0 0 0 4px var(--blue-600),
        0 0 0 4px var(--neutral-0);
    }
    &.primary {
      background-color: var(--yellow-500);
      box-shadow: 2px 2px 0 0 var(--neutral-900);
      &:hover {
        box-shadow: 4px 4px 0 0 var(--neutral-900);
      }
      &:focus {
        box-shadow: 3px 3px 0 0 var(--blue-600);
      }
    }
    &.secondary {
      box-shadow: 2px 2px 0 0 var(--neutral-900);
      &:hover {
        box-shadow: 4px 4px 0 0 var(--neutral-900);
      }
      &:focus {
        box-shadow: 3px 3px 0 0 var(--blue-600);
      }
    }
  }
</style>
