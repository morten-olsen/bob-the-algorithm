import React, { ReactNode, useMemo } from "react";
import styled from "styled-components/native";
import stringToColor from 'string-to-color';
import chroma from 'chroma-js';
import { PlanItem } from "#/types/plans";
import { AgendaItemView } from "./agenda-item";

type DayViewProps = {
  plan: PlanItem[];
}

type LayoutItem = {
  height: number;
  color: string;
  body?: ReactNode;
  start: Date;
  end: Date;
}

const Wrapper = styled.View`
`;

const Title = styled.Text`
`;

const getBody = (item: PlanItem) => {
  if (item.type === 'transition') {
    return <Title>{item.from.title} ➜ {item.to.title}</Title>
  } else {
    return <Title>{item.name}</Title>
  }
}


const DayView: React.FC<DayViewProps> = ({ plan }) => {
  const layout = useMemo(
    () => {
      const [...planItems] = [...plan];
      const items: LayoutItem[] = [];
      var lastPlanItem: PlanItem | undefined;
      for (let planItem of planItems) {
        if (lastPlanItem && planItem.start.getTime() - lastPlanItem.end.getTime() > 0) {
          items.push({
            height: planItem.start.getTime() - lastPlanItem.end.getTime(),
            color: 'transparent',
            start: lastPlanItem.end,
            end: planItem.start,
          })
        }
        let color = planItem.type === 'transition' ? '#34495e' : stringToColor(planItem.name);
        color = chroma(color).luminance(0.7).saturate(1).brighten(0.6).hex();
        items.push({
          height: planItem.end.getTime() - planItem.start.getTime(),
          color,
          start: planItem.start,
          end: planItem.end,
          body: getBody(planItem),
        });
        lastPlanItem = planItem;
      }
      return items;
    },
    [plan],
  );

  return (
    <Wrapper>
      {layout.map((item, i) => (
        <AgendaItemView key={i} item={item} />
      ))} 
    </Wrapper>
  )
};

export type { DayViewProps };
export { DayView };
