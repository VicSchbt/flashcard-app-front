<script lang="ts">
  import Card from '../common/Card.svelte';
  import { enhance } from '$app/forms';
  import Button from '../common/Button.svelte';

  type FormState = {
    errors?: {
      question?: string;
      answer?: string;
      category?: string;
      general?: string;
    };
    values?: {
      question?: string;
      answer?: string;
      category?: string;
    };
    success?: boolean;
  };

  interface Props {
    isOpen: boolean;
    flashcardId?: string;
    form?: FormState | null;
    onSuccess?: () => void | Promise<void>;
    initialValues?: {
      question?: string;
      answer?: string;
      category?: string;
    };
    onCancel: () => void;
  }

  let {
    isOpen,
    flashcardId,
    form = $bindable(),
    initialValues,
    onSuccess,
    onCancel,
  }: Props = $props();

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

    <dialog
      open
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      class="edit-dialog absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-900 p-8 shadow-lg"
    >
      <h2 id="dialog-title" class="text-preset-2 mb-6 text-neutral-900">Edit your card</h2>
      <form
        method="POST"
        action="?/update"
        use:enhance={({ formElement }) => {
          console.log('Form submitting...');

          return async ({ result, update }) => {
            console.log('Result:', result);

            await update(); // SvelteKit update form prop

            if (result.type === 'success') {
              console.log('Success! Resetting form');
              formElement.reset();
              await onSuccess?.();
            }
          };
        }}
        class="flex flex-col gap-6"
      >
        <input type="hidden" name="id" value={flashcardId || ''} />
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="question" class="text-preset-4-medium"> Question </label>
            <input
              name="question"
              type="text"
              placeholder="e.g., What is the capital of France?"
              class="rounded-md border border-neutral-900 p-4"
              value={initialValues?.question || ''}
              required
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="answer" class="text-preset-4-medium"> Answer </label>
            <textarea
              name="answer"
              placeholder="e.g., Paris"
              value={initialValues?.answer || ''}
              required
              class="min-h-[100px] resize-none rounded-md border border-neutral-900 p-4 align-top"
            ></textarea>
          </div>
          <div class="flex flex-col gap-2">
            <label for="category" class="text-preset-4-medium"> Category </label>
            <input
              name="category"
              type="text"
              placeholder="e.g., Geography"
              value={initialValues?.category || ''}
              required
              class="rounded-md border border-neutral-900 p-4"
            />
          </div>
        </div>
        <Button type="submit" style="primary" label="Update Card" class="self-end" />
      </form>
    </dialog>
  </div>
{/if}

<style>
  .edit-dialog {
    background-color: var(--neutral-0);
    max-width: 600px;
    width: 100%;
    overflow: auto;
  }
</style>
