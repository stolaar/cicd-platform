import { SchemaObject, getJsonSchemaRef } from "@loopback/rest"
import { User } from "../models"

export const UserResponseSchema = {
  responses: {
    "200": {
      description: "User.",
      content: {
        schema: getJsonSchemaRef(User),
      },
    },
  },
}

export const UserUpdateInfoSchema: SchemaObject = {
  type: "object",
  properties: {
    date: {
      type: "string",
      maxLength: 10,
    },
    gender: {
      type: "string",
    },
    height: {
      type: "number",
    },
    weight: {
      type: "number",
    },
    targetWeight: {
      type: "number",
    },
    goal: {
      type: "string",
    },
  },
}
export const UserUpdatePreferenceSchema: SchemaObject = {
  type: "object",
  properties: {
    mute: {
      type: "boolean",
    },
    voice_guide: {
      type: "boolean",
    },
    sound_effect: {
      type: "boolean",
    },
    notifications: {
      type: "boolean",
    },
    workout_notifications: {
      type: "boolean",
    },
  },
}
export const UserUpdateSchema: SchemaObject = {
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 30,
    },
    email: {
      type: "null",
    },
    password: { type: "null" },
    info: UserUpdateInfoSchema,
    preferences: UserUpdatePreferenceSchema,
  },
}
export const UserUpdateRequestBody = {
  description: "Required input for user.",
  content: {
    "application/json": {
      schema: UserUpdateSchema,
    },
  },
  required: true,
}
