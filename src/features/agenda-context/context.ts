import { UserLocation } from "#/types/location"
import { createContext } from "react"

type AgendaContext = {
  enabled: boolean;
  locations?: UserLocation[];
  startMax?: Date;
  startMin?: Date;
  duration?: number;
  count?: number;
}

type AgendaContextContextValue = {
  contexts: {[id: string]: AgendaContext};
  set: (id: string, context: AgendaContext) => Promise<void>;
}

const AgendaContextContext = createContext<AgendaContextContextValue>(undefined as any);

export type { AgendaContext, AgendaContextContextValue };
export {AgendaContextContext };
