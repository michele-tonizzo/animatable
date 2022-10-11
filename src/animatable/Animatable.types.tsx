import { AnimeTimelineInstance } from "animejs";

export interface IAnimatableProps {
  children: React.ReactElement;

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
