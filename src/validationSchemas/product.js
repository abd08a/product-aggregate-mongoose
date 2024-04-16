import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export default productSchema;
