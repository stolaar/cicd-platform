import { SchemaObject, getJsonSchemaRef } from "@loopback/rest"
import { User } from "../../users/models"

export const UserSignUpResponseSchema = {
  responses: {
    "200": {
      description:
        "This is response schema when the user is successfully signed up",
      content: {
        schema: getJsonSchemaRef(User),
      },
    },
  },
}

export const UserSignUpSchema: SchemaObject = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      maxLength: 30,
    },
    password: {
      type: "string",
      maxLength: 30,
    },
  },
}

export const UserSignUpRequestBody = {
  description: "Required input for sign up",
  content: {
    "application/json": {
      schema: UserSignUpSchema,
    },
  },
  required: true,
}

export const UserLoginResponseSchema = {
  responses: {
    "200": {
      description:
        "This is response schema when the user is successfully logged in, they get an acessToken back",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
}

export const UserLoginSchema: SchemaObject = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      maxLength: 30,
    },
    password: {
      type: "string",
      maxLength: 30,
    },
  },
}

export const UserLoginRequestBody = {
  description: "Required input for login",
  content: {
    "application/json": {
      schema: UserLoginSchema,
    },
  },
  required: true,
}

export const ResetPasswordResponseSchema = {
  responses: {
    "200": {
      description:
        "This is response schema when the reset password pin is successful send",
      content: {
        schema: getJsonSchemaRef(User),
      },
    },
  },
}

export const ResetPasswordSchema: SchemaObject = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      maxLength: 30,
    },
  },
}

export const ResetPasswordRequestBody = {
  description: "Required input mail for sent pin",
  content: {
    "application/json": {
      schema: ResetPasswordSchema,
    },
  },
  required: true,
}

export const CheckCodeSchema: SchemaObject = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      maxLength: 30,
    },
    pin: {
      type: "number",
      maxLength: 6,
      minLength: 6,
    },
  },
}

export const CheckCodeRequestBody = {
  description: "Required input mail for sent pin",
  content: {
    "application/json": {
      schema: CheckCodeSchema,
    },
  },
  required: true,
}

export const PasswordSchema: SchemaObject = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      maxLength: 30,
    },
    password: {
      type: "string",
      maxLength: 30,
    },
    pin: {
      type: "number",
      maxLength: 6,
      minLength: 6,
    },
  },
}

export const PasswordRequestBody = {
  description: "Required input mail for sent pin",
  content: {
    "application/json": {
      schema: PasswordSchema,
    },
  },
  required: true,
}
