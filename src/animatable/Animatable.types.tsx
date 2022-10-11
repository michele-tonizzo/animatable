import { AnimeTimelineInstance } from "animejs";
import { ReactElement } from "react";

export interface IAnimatableProps {
  children: ReactElement;

  offsetTop?: number;
  offsetBottom?: number;

  animations: IAnimation[];
}

export interface IAnimation {
  animation: (timeline: AnimeTimelineInstance) => AnimeTimelineInstance;
  from?: number;
  to?: number;
  at?: number;
}

export interface IParsedAnimation extends IAnimation {
  timeline: AnimeTimelineInstance;
  played?: boolean;
}
