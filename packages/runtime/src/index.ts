import { HealthService } from "@lantern/application"
import { Layer, ManagedRuntime } from "effect"

export const LanternLiveLayer = Layer.mergeAll(HealthService.layer)

export function makeLanternRuntime() {
  return ManagedRuntime.make(LanternLiveLayer)
}
