<script lang="ts">
	import Card from '../common/Card.svelte';
	import Divider from '../common/Divider.svelte';
	import Tag from '../common/Tag.svelte';
	import ProgressionBar from './ProgressionBar.svelte';
	let { flashcard } = $props();
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
		<button type="button" aria-label="See more">
			<img src="/images/icon-menu.svg" alt="See more" aria-hidden="true" />
		</button>
	</div>
</Card>
