import { error, json, type RequestHandler } from '@sveltejs/kit';
import { JSON_SERVER_URL } from '$env/static/private';

export const PATCH: RequestHandler = async ({ params, request }) => {
  try {
    const id = params.id;
    if (!id) {
      throw error(400, 'Flashcard ID is required');
    }

    const body = await request.json();

    const response = await fetch(`${JSON_SERVER_URL}/flashcards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw error(response.status, 'Failed to update flashcard from mock API');
    }

    const data = await response.json();
    return json({ flashcard: data });
  } catch (err) {
    console.error('Error updating flashcard from mock API:', err);
    throw error(500, 'Failed to update flashcard from mock API');
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const id = params.id;
    if (!id) {
      throw error(400, 'Flashcard ID is required');
    }
    const response = await fetch(`${JSON_SERVER_URL}/flashcards/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw error(response.status, 'Failed to delete flashcard from mock API');
    }
    const data = await response.json();
    return json({ message: 'Flashcard deleted successfully', data });
  } catch (err) {
    console.error('Error deleting flashcard from mock API:', err);
    throw error(500, 'Failed to delete flashcard from mock API');
  }
};
