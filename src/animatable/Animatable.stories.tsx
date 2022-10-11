import { Animatable } from "./Animatable";

export default {
  title: "Components/Animatable",
  component: Animatable,
};

export const Default = () => (
  <>
    <div style={{ height: "500vh" }}>
      <div style={{ height: "100vh" }} />
      <Animatable
        animations={[
          {
            from: 0.1,
            to: 0.9,
            animation: (timeline) =>
              timeline.add({
                translateX: 100,
              }),
          },
        ]}
      >
        <div style={{ position: "sticky", top: "0px" }}>HELLO</div>
      </Animatable>

      <Animatable
        animations={[
          {
            at: 0.5,
            animation: (timeline) =>
              timeline.add({
                color: "#eee",
              }),
          },
        ]}
      >
        <div style={{ position: "sticky", top: "300px", left: "500px" }}>
          WORLD
        </div>
      </Animatable>
    </div>

    <div style={{ height: "200vh" }} />
  </>
);
