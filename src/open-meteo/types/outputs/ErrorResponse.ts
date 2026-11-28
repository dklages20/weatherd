import { z } from 'zod';

export const errorResponseSchema = z
  .object({
    error: z.boolean(),
    reason: z.string().default('Unknown Reason')
  });

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
