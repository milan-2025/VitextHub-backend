import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

export const handleValidationResults = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const errorsFound: { [key: string]: string } = {}

  errors.array().forEach((err) => {
    //@ts-ignore
    errorsFound[err.param] = err.msg
  })

  return res.status(400).json({
    success: false,
    errors: errorsFound,
    message: "Validation failed",
  })
}
