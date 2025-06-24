import { Error as MongooseError } from "mongoose";

interface FormattedValidationError {
  message: string;
  success: false;
  error: {
    name: string;
    errors: {
      [field: string]: {
        message: string;
        name: string;
        properties: any;
        kind: string;
        path: string;
        value: any;
      };
    };
  };
}

export const handleValidationError = (
  error: MongooseError.ValidationError
): FormattedValidationError => {
  const formattedErrors = Object.values(error.errors).reduce(
    (acc: any, err: any) => {
      acc[err.path] = {
        message: err.message,
        name: err.name,
        properties: err.properties,
        kind: err.kind,
        path: err.path,
        value: err.value,
      };
      return acc;
    },
    {}
  );

  return {
    message: "Validation failed",
    success: false,
    error: {
      name: error.name,
      errors: formattedErrors,
    },
  };
};
