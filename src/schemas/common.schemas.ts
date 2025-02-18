import { z } from 'zod'

export const searchQuerySchema = z.object({
  q: z.string().min(2, 'Search query must be at least 2 characters'),
  fields: z
    .string()
    .transform((str) => str.split(','))
    // .pipe(z.array(z.string()))
    .pipe(z.array(z.enum(['fisrtName', 'email'])))
    .optional(),
})

export const paginationSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
  sortBy: z.enum(['name', 'email', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

export type PaginationQuery = z.infer<typeof paginationSchema>
export type SearchQuery = z.infer<typeof searchQuerySchema>
