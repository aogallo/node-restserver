import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(schema)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        })
      }
      return res.status(500)
    }
  }
}
