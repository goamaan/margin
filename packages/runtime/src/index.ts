import { HealthService } from "@margin/application"
import { Layer, ManagedRuntime } from "effect"

export const MarginLiveLayer = Layer.mergeAll(HealthService.layer)

export function makeMarginRuntime() {
  return ManagedRuntime.make(MarginLiveLayer)
}
