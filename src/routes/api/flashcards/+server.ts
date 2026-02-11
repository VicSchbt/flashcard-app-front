import { json } from '@sveltejs/kit';
import flashcards from '$lib/data/flashcards.json';

export async function GET() {
	return json(flashcards);
}
