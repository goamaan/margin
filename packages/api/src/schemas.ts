import { Schema } from "effect"

export const SystemHealthResponse = Schema.Struct({
  environment: Schema.String,
  service: Schema.Literal("margin-api"),
  status: Schema.Literal("ok"),
  timestamp: Schema.String,
  version: Schema.String,
})

export type SystemHealthResponse = Schema.Schema.Type<
  typeof SystemHealthResponse
>

export const ApiErrorResponse = Schema.Struct({
  code: Schema.String,
  message: Schema.String,
})

export type ApiErrorResponse = Schema.Schema.Type<typeof ApiErrorResponse>
