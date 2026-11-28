import { describe, expect, it } from 'vitest';
import { WeatherdError } from '../WeatherdError.ts';

describe('WeatherdError', () => {
  it('extends Error', () => {
    expect(new WeatherdError('An application error occurred')).toBeInstanceOf(Error);
  });
});
