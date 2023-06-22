import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Techprodc",
    url: "https://techprodc.com/",
    image: "../projects/teachpro.jpg",
    desc: "I create this project whit vue",
  },
  {
    title: "Baleoni",
    url: "https://baleoni.az/",
    image: "projects/bal.jpg",
    desc: "I create this project whit vue",
  },

  {
    title: "Gent",
    url: "https://gent.az/",
    image: "projects/gent.jpg",
    desc: "I create this project whit html css js",
  },

  {
    title: "Gia",
    url: "https://gia.az/",
    image: "projects/gia.jpg",
    desc: "I create this project whit html css js",
  },

  {
    title: "omiddesign",
    url: "https://omiddesign.az/",
    image: "projects/omid.jpg",
    desc: "I create this project whit Threejs",
  },

  {
    title: "Perla",
    url: "https://perla.az/",
    image: "projects/perla.png",
    desc: "I create this project whit html css js",
  },

  {
    title: "Primeelektro",
    url: "https://primeelektro.az/",
    image: "projects/PrimeLogo.png",
    desc: "I create this project whit html css js",
  },

  {
    title: "Supplychainforum",
    url: "https://supplychainforum.az/",
    image: "projects/safe.jpg",
    desc: "I create this project whit html css js",
  },
];

const Project = (props) => {
    const { project, highlighted } = props;
  
    const background = useRef();
    const bgOpacity = useMotionValue(0.4);
  
    useEffect(() => {
      animate(bgOpacity, highlighted ? 0.7 : 0.4);
    }, [highlighted]);
  
    useFrame(() => {
      background.current.material.opacity = bgOpacity.get();
    });
  
    return (
      <group {...props}>
        <mesh
          position-z={-0.001}
          onClick={() => window.open(project.url, "_blank")}
          ref={background}
        >
          <planeGeometry args={[2.2, 2.2]} />
          <meshBasicMaterial color="black" transparent opacity={0.4} />
        </mesh>
         <Image
          scale={[2, 1.2, 1]}
          url={project.image}
          toneMapped={false}
          position-y={0.3}
        /> 
        <Text
          maxWidth={2}
          anchorX={"left"}
          anchorY={"top"}
          fontSize={0.3}
          position={[-1, -0.4, 0]}
        >
          {project.title.toUpperCase()}
        </Text>
        <Text
          maxWidth={2}
          anchorX="left"
          anchorY="top"
          fontSize={0.1}
          position={[-1, -0.8, 0]}
        >
          {project.desc}
        </Text>
      </group>
    );
  };
  
  export const currentProjectAtom = atom(Math.floor(projects.length / 2));
  
  export const Projects = () => {
    const { viewport } = useThree();
    const [currentProject] = useAtom(currentProjectAtom);
  
    return (
      <group position-y={-viewport.height * 2 + 1}>
        {projects.map((project, index) => (
          <motion.group
            key={"project_" + index}
            position={[index * 2.5, 0, -3]}
            animate={{
              x: 0 + (index - currentProject) * 2.5,
              y: currentProject === index ? 0 : -0.1,
              z: currentProject === index ? -2 : -3,
              rotateX: currentProject === index ? 0 : -Math.PI / 3,
              rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
            }}
          >
            <Project project={project} highlighted={index === currentProject} />
          </motion.group>
        ))}
      </group>
    );
  };