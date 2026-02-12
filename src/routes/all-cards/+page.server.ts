import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  post: async (event) => {
    const request = event.request;
    // 1. Extract form data
    const formData = await request.formData();

    // 2. Get form fields
    const question = formData.get('question');
    const answer = formData.get('answer');
    const category = formData.get('category');

    // 3. Validate form fields
    const errors: Record<string, string> = {};
    if (!question || (typeof question === 'string' && question.trim() === '')) {
      errors.question = 'Question is required';
    }
    if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
      errors.answer = 'Answer is required';
    }
    if (!category || (typeof category === 'string' && category.trim() === '')) {
      errors.category = 'Category is required';
    }
    if (Object.keys(errors).length > 0) {
      return fail(400, {
        errors,
        values: { question: question || '', answer: answer || '', category: category || '' },
      });
    }

    // 4. Create flashcard object
    const flashcard = {
      question,
      answer,
      category,
      knownCount: 0,
    };
    // 5. Send flashcard to API
    const response = await event.fetch('/api/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flashcard),
    });
    // 6. Handle response
    if (!response.ok) {
      return fail(response.status, {
        errors: { general: 'Failed to create flashcard. Please try again.' },
        values: { question, answer, category },
      });
    }
    // 7. Return success
    const data = await response.json();
    return { success: true, flashcard: data.flashcard };
  },

  update: async (event) => {
    const request = event.request;
    const formData = await request.formData();

    const id = formData.get('id');
    const question = formData.get('question');
    const answer = formData.get('answer');
    const category = formData.get('category');

    const errors: Record<string, string> = {};
    if (!id || typeof id !== 'string') {
      errors.general = 'Flashcard ID is required';
    }
    if (!question || (typeof question === 'string' && question.trim() === '')) {
      errors.question = 'Question is required';
    }
    if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
      errors.answer = 'Answer is required';
    }
    if (!category || (typeof category === 'string' && category.trim() === '')) {
      errors.category = 'Category is required';
    }
    if (Object.keys(errors).length > 0) {
      return fail(400, {
        errors,
        values: { question: question || '', answer: answer || '', category: category || '' },
      });
    }

    const updatedFlashcard = {
      question,
      answer,
      category,
    };

    const response = await event.fetch(`/api/flashcards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFlashcard),
    });

    if (!response.ok) {
      return fail(response.status, {
        errors: { general: 'Failed to update flashcard. Please try again.' },
        values: { question, answer, category },
      });
    }

    const data = await response.json();
    return { success: true, flashcard: data.flashcard };
  },
} satisfies Actions;
