import anime from "animejs";
import React, { useEffect, useRef } from "react";
import { IAnimatableProps, IParsedAnimation } from "./Animatable.types";

function Animatable(animatableProps: IAnimatableProps) {
  const { children, offsetTop, offsetBottom, animations } = animatableProps;

  const childRef = useRef<HTMLElement>();

  const parsedAnimations = useRef<IParsedAnimation[]>();

  /**
   * Listen for scroll
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Save animations in a ref object
   */
  useEffect(() => {
    if (!!!childRef.current) return;

    parsedAnimations.current = animations.map((params) => {
      const _timeline = anime.timeline({
        targets: childRef.current,
        duration: 1000,
        easing: "easeInOutQuad",
        autoplay: false,
      });

      const timeline = params.animation(_timeline);

      return { ...params, timeline };
    });
  }, [childRef.current]);

  function handleScroll() {
    if (!!!childRef.current) return;

    const el = childRef.current;
    const sizeY = window.innerHeight;

    const { top: elTop, height: elHeight } = el.getBoundingClientRect();

    const bottomOffPx = (offsetBottom ?? 0) * sizeY;
    const topOffPx = (offsetTop ?? 0) * sizeY;

    const parent = el.parentElement;

    let d1: number = sizeY - elTop - bottomOffPx;
    let d2: number = sizeY + elHeight - bottomOffPx - topOffPx;

    if (parent && el.style.position === "sticky") {
      const { top: parentTop, height: parentHeight } =
        parent.getBoundingClientRect();

      d1 += parentTop;
      d2 -= parentHeight;
    }

    const perc = d1 / d2;

    play(perc);
  }

  function play(percentage: number) {
    const lh = parsedAnimations.current?.length ?? 0;

    for (let i = 0; i < lh; i++) {
      const parsedAnim = parsedAnimations.current![i];

      if (parsedAnim.at) {
        if (percentage >= parsedAnim.at && !!!parsedAnim.played) {
          parsedAnim.timeline.play();
          parsedAnim.played = true;
        }
      }

      if (
        parsedAnim.from &&
        parsedAnim.to &&
        percentage > parsedAnim.from &&
        percentage < parsedAnim.to
      ) {
        const norm =
          (percentage - parsedAnim.from) / (parsedAnim.to - parsedAnim.from);

        parsedAnim.timeline.seek(norm * parsedAnim.timeline.duration);
      }
    }
  }

  return React.cloneElement(children, {
    ref: childRef,
  });
}

export { Animatable };
