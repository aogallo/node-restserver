import { z } from 'zod'

export interface IUser {
  firstName: string
  email: string
  password: string
  state: boolean
  google: boolean
  role: string
  img?: string
}

export const userZodSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First Name must be at least 3 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  lastName: z
    .string()
    .min(3, 'Last Name must be at least 3 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
  state: z.boolean().default(true),
  google: z.boolean().default(false),
  role: z.array(z.string()).optional(),
  img: z.string().optional(),
})

export type User = z.infer<typeof userZodSchema>
