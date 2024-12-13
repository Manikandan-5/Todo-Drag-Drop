import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim"; // slim version for reduced bundle size

const ParticlesComponent = (props) => {
  // Initialize particles engine and load configuration
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load the necessary particles configuration (e.g., slim version)
      await loadSlim(engine);
    });
  }, []); // Only run this effect once during component mount

  const particlesLoaded = (container) => {
    console.log("Particles container loaded:", container);
  };

  // Particle options configuration
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#5710d9", // background color
        },
      },
      fpsLimit: 120, // Max frames per second
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse", // Repulse particles on click
          },
          onHover: {
            enable: true,
            mode: 'grab', // Grab particles on hover
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: "#FFFFFF", // Particle color
        },
        links: {
          color: "#FFFFFF", // Link color
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce", // Bounce particles off edges
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true, // Density of particles
          },
          value: 150, // Number of particles
        },
        opacity: {
          value: 1.0, // Particle opacity
        },
        shape: {
          type: "circle", // Particle shape
        },
        size: {
          value: { min: 1, max: 3 }, // Particle size
        },
      },
      detectRetina: true, // Detect retina display
    }),
    []
  );

  return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
