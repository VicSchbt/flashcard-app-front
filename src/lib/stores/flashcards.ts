import { writable } from 'svelte/store';
import type { Flashcard } from '$lib/types';

export const flashcards = writable<Flashcard[]>([]);

export const currentCard = writable<Flashcard | null>(null);

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
			)
	};
}

export const flashcardStore = createFlashcardStore();
