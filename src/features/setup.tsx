import { GetTransition } from "#/types/location"
import { ReactNode } from "react"
import { AgendaContextProvider } from "./agenda-context"
import { CalendarProvider } from "./calendar"
import { LocationProvider } from "./location"
import { PlannerProvider } from "./planner"
import { RoutinesProvider } from "./routines"

type SetupProps = {
  day: Date;
  setDate: (date: Date) => void;
  children: ReactNode;
  getTransit: GetTransition;
}
const Setup: React.FC<SetupProps> = ({
  children,
  day,
  setDate,
  getTransit,
}) => (
  <CalendarProvider date={day} setDate={setDate}>
    <RoutinesProvider>
      <LocationProvider getTransition={getTransit} lookup={() => []}>
        <AgendaContextProvider day={day}>
          <PlannerProvider>
            {children}
          </PlannerProvider>
        </AgendaContextProvider>
      </LocationProvider>
    </RoutinesProvider>
  </CalendarProvider>
);

export type { SetupProps };
export { Setup };
