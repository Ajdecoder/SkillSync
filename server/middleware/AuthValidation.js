import Joi from "joi";

export const SignupValidation = (req, res, next) => {
  const Signupschema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    role: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required(),
      reEnterPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required(),
  });

  const { error } = Signupschema.validate(req.body);

  if (error) {
    console.log(error)
    return res.status(400).json({
      message: "BAD REQUEST",
      error: error.details,
    });
  } else {
    next();
  }
};

export const LoginValidation = (req, res, next) => {
    
  const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required(),
  });

  const { error } = LoginSchema.validate(req.body);

  if (error) {
    
    return res.status(400).json({
      message: "BAD REQUEST",
      error: error.details,
    });
  } else {
    next();
  }
};
