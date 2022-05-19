import { dayUtils } from "#/features/day";
import { PlanResultDay } from "#/features/planner"
import { Body1, Jumbo } from "@morten-olsen/ui";
import { PlanDayTask } from "./task";

type Props = {
  day: PlanResultDay;
};

const PlanDay: React.FC<Props> = ({ day }) => {
  if (day.status === 'waiting') {
    return <></>
  }
  if (day.status === 'running') {
    return <Body1>Running</Body1>
  }
  return (
    <>
      {day.plan.map((item) => {
        if (item.type === 'task') {
          return <PlanDayTask task={item} />
        }
        return <Body1>Transit {item.from.title} to {item.to.title}</Body1>
      })}
    </>
  )
}

export { PlanDay };
