import { error, json, type RequestHandler } from '@sveltejs/kit';
import { JSON_SERVER_URL } from '$env/static/private';

export const GET: RequestHandler = async () => {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/flashcards`);
    if (!response.ok) {
      throw error(response.status, 'Failed to fetch flashcards from mock API');
    }
    const data = await response.json();
    return json({ flashcards: data });
  } catch (err) {
    console.error('Error fetching flashcards from mock API:', err);
    throw error(500, 'Failed to fetch flashcards from mock API');
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    const response = await fetch(`${JSON_SERVER_URL}/flashcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw error(response.status, 'Failed to create flashcard in mock API');
    }

    const data = await response.json();
    return json({ flashcard: data }, { status: 201 });
  } catch (err) {
    console.error('Error creating flashcard:', err);
    throw error(500, 'Internal server error');
  }
};
