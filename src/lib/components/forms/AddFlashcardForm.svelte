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

  let {
    form = $bindable(),
    onSuccess,
  }: { form?: FormState | null; onSuccess?: () => void | Promise<void> } = $props();
  let isSubmitting = $state(false);
</script>

<Card class="flex flex-col gap-2 rounded-2xl p-5 shadow-lg">
  <form
    method="POST"
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
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="question" class="text-preset-4-medium"> Question </label>
        <input
          name="question"
          type="text"
          placeholder="e.g., What is the capital of France?"
          class="rounded-md border border-neutral-900 p-4"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="answer" class="text-preset-4-medium"> Answer </label>
        <textarea
          name="answer"
          placeholder="e.g., Paris"
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
          required
          class="rounded-md border border-neutral-900 p-4"
        />
      </div>
    </div>
    <Button
      type="submit"
      style="primary"
      label="Create Card"
      iconPath="/images/icon-circle-plus.svg"
      iconAlt="Add"
      class="self-start"
    />
  </form>
</Card>
