<script lang="ts">
  import Button from '../common/Button.svelte';
  import Divider from '../common/Divider.svelte';
  interface Props {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  let { isOpen, title, description, confirmText, cancelText, onConfirm, onCancel }: Props =
    $props();

  // ESC handle
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  };

  const handleBackdropClick = () => {
    onCancel();
  };
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if isOpen}
  <div class="fixed inset-0 z-40 flex items-center justify-center">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-neutral-900 opacity-70"
      onclick={handleBackdropClick}
      role="presentation"
    ></div>
    <!-- Dialog -->
    <dialog
      open
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      class="confirmation-dialog absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-900 shadow-lg"
    >
      <div class="flex flex-col gap-2 p-6">
        <h2 class="text-preset-2 text-neutral-900" id="dialog-title">{title}</h2>
        <p class="text-preset-4 text-neutral-900" id="dialog-description">{description}</p>
      </div>
      <Divider orientation="horizontal" />
      <div class="flex justify-end gap-2 px-6 pt-3 pb-4">
        <Button style="" onclick={onCancel} label={cancelText} />
        <Button style="primary" onclick={onConfirm} label={confirmText} />
      </div>
    </dialog>
  </div>
{/if}

<style>
  .confirmation-dialog {
    background-color: var(--neutral-0);
    max-width: 600px;
    width: 100%;
  }
</style>
