
import React, { ReactNode, useMemo } from "react";
import styled from "styled-components/native";
import stringToColor from 'string-to-color';
import parseCSSColor from "parse-css-color";
import chroma from 'chroma-js';
import { PlanItem } from "#/types/plans";

type AgendaItemProps = {
  item: LayoutItem;
  onPress?: () => void;
}

type LayoutItem = {
  height: number;
  color: string;
  body?: ReactNode;
  start: Date;
  end: Date;
}

const Time = styled.Text<{background : string}>`
  font-size: 10px;
  color: #fff;
  font-weight: bold;
  color: ${({ background }) => background === 'transparent' ? '#222' : '#fff'};
`;

const TimeBox = styled.View<{
  background: string;
}>`
  margin-right: 10px;
  width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ background }) => background === 'transparent' ? background : chroma(background).darken(1.5).hex()};
`;

const Filler = styled.View`
  margin: 10px;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Block = styled.View<{
  background: string;
  height: number;
}>`
  background: ${({ background }) => background};
  height: ${({ height }) => height / 3}px;
  max-height: 100px;
  margin: 5px;
  flex-direction: row;
  align-items: center;
  border-radius: 3px;
  border: solid 1px ${({ background }) => background === 'transparent' ? background : chroma(background).darken(0.3).hex()};
`;

const Main = styled.View`
  flex: 1;
`

const isDark = (color: string) => {
  const parsed = parseCSSColor(color);
  const [r, g, b] = parsed!.values;

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma < 150;
}

const formatTime = (time: Date) => {
  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`;
};

const Touch = styled.TouchableOpacity`

`;

const AgendaItemView: React.FC<AgendaItemProps> = ({ item, onPress }) => {
  const view = (
    <Block height={Math.max(70, item.height / 15000)} background={item.color}>
      <TimeBox background={item.color}>
        <Time background={item.color}>{formatTime(item.start)}</Time>
        <Time background={item.color}>{formatTime(item.end)}</Time>
      </TimeBox>
      <Main>
        {item.body}
      </Main>
      <Filler />
    </Block>
  );

  if (onPress) {
    return (
      <Touch onPress={onPress}>
        {view}
      </Touch>
    );
  }
  return view;
};

export type { AgendaItemProps };
export { AgendaItemView };
