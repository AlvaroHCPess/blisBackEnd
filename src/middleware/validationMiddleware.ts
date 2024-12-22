import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.date().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};
