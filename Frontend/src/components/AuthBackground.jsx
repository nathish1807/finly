import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function AuthBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0 -z-10"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 40,
          },
          color: {
            value: "#D4AF37",
          },
          links: {
            enable: true,
            color: "#D4AF37",
            opacity: 0.08,
          },
          move: {
            enable: true,
            speed: 0.4,
          },
          opacity: {
            value: 0.2,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
}