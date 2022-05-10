import { ReactNode } from "react"
import { AppointmentsProvider } from "./appointments"
import { DateProvider } from "./day"
import { GoalsProvider } from "./goals/context"
import { GetTransition, LocationProvider } from "./location"
import { OverrideProvider } from "./overrides"
import { PlannerProvider } from "./planner"
import { RoutinesProvider } from "./routines"

type SetupProps = {
  children: ReactNode;
  getTransit: GetTransition;
}

const Setup: React.FC<SetupProps> = ({
  children,
  getTransit,
}) => {
  return (
    <DateProvider>
      <PlannerProvider storageKey="planner">
        <LocationProvider getTransition={getTransit} lookup={() => []}>
          <AppointmentsProvider>
            <GoalsProvider storageKey="goals">
              <RoutinesProvider storageKey="routines">
                <OverrideProvider>
                  {children}
                </OverrideProvider>
              </RoutinesProvider>
            </GoalsProvider>
          </AppointmentsProvider>
        </LocationProvider>
      </PlannerProvider>
    </DateProvider>
  );
};

export type { SetupProps };
export { Setup };
