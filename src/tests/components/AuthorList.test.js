import { describe, it, expect, vi } from 'vitest';
import { createAuthorsSpan } from '../../components/AuthorList';

vi.mock('quip-apps-api', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    apps: {
      getRootRecord: () => ({
        get: (key) => {
          if (key === 'authorImages') {
            return [{ name: 'Author 1', url: 'http://example.com/1.jpg' }, { name: 'Author 2', url: null }];
          }
          return [];
        }
      }),
      EventType: {},
      addEventListener: vi.fn(),
    },
  };
});

describe('AuthorList', () => {
  it('should create an authors span element with authors data', () => {
    const authors = ['Author 1', 'Author 2'];
    const authorsSpan = createAuthorsSpan(authors);

    // Assertions
    expect(authorsSpan).toBeTruthy();
    expect(authorsSpan.childNodes).toHaveLength(authors.length * 2 - 1); // Including text nodes for commas and 'and'
    expect(authorsSpan.querySelectorAll('.warning-emoji').length).toBe(1);
  });

  // Add more tests as needed
});
