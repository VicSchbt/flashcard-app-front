import { writable, derived } from 'svelte/store';
import type { Flashcard } from '$lib/types';

function createFlashcardStore() {
	const { subscribe, set, update } = writable<Flashcard[]>([]);

	return {
		subscribe,
		load: async () => {
			const response = await fetch('/api/flashcards');
			const data = await response.json();
			set(data.flashcards);
		},
		markAsKnown: (id: string) =>
			update((cards) =>
				cards.map((card) => (card.id === id ? { ...card, knownCount: card.knownCount + 1 } : card))
			),
		create: async (flashcard: Flashcard) => {
			const response = await fetch('/api/flashcards', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(flashcard)
			});
			if (!response.ok) {
				throw new Error('Failed to create flashcard');
			}
			const data = await response.json();
			update((cards) => [...cards, data.flashcard]);
			return data.flashcard;
		}
	};
}

export const flashcardStore = createFlashcardStore();

export const flashcardCategories = derived(flashcardStore, ($flashcards) => {
	const categories = new Map<string, number>();
	$flashcards.forEach((card: Flashcard) => {
		categories.set(card.category, (categories.get(card.category) || 0) + 1);
	});
	return categories;
});
