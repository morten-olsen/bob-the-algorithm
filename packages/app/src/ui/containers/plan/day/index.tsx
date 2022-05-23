import { dayUtils } from "#/features/day";
import { PlanResultDay } from "#/features/planner"
import { Body1, Jumbo } from "@morten-olsen/ui";
import styled from "styled-components/native";
import { PlanDayTask } from "./task";

type Props = {
  day: PlanResultDay;
};

const Transit = styled(Body1)`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PlanDay: React.FC<Props> = ({ day }) => {
  if (day.status === 'waiting') {
    return <></>
  }
  if (day.status === 'running') {
    return <Body1>Running, nodes: {day.nodes}, strategy: {day.strategy}</Body1>
  }
  return (
    <>
      {day.plan.map((item) => {
        if (item.type === 'task') {
          return <PlanDayTask task={item} />
        }
        return <Transit>{item.from.title} → {item.to.title}</Transit>
      })}
    </>
  )
}

export { PlanDay };
