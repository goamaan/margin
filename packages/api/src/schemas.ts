import { Schema } from "effect"

export class SystemHealthResponse extends Schema.Class<SystemHealthResponse>("SystemHealthResponse")({
  environment: Schema.String,
  service: Schema.Literal("margin-api"),
  status: Schema.Literal("ok"),
  timestamp: Schema.String,
  version: Schema.String,
}) {}

export class ApiErrorResponse extends Schema.Class<ApiErrorResponse>("ApiErrorResponse")({
  code: Schema.String,
  message: Schema.String,
}) {}
