import { Avatar } from "./Avatar";
import { Office } from "./Office";
import { motion } from "framer-motion-3d";
import { useScroll } from "@react-three/drei";

import { useThree, useFrame } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { frameMotionConfig } from "../config";
import { Projects } from "./Projects";
import { Background } from "./Background";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width /12;
  const officeScaleRation = Math.max(0.5, Math.min(0.9 * responsiveRatio,0.9))

  const [section, setSection] = useState(0);
  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...frameMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...frameMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [charecterAnimation, setCharecterAnimation] = useState("Typing");

  useEffect(() => {
    setCharecterAnimation("Falling");
    setTimeout(() => {
      setCharecterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  const characterGroup = useRef()

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }
    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    if (section === 0) {
        characterContainerAboutRef.current.getWorldPosition(
          characterGroup.current.position
        );
      }
  });
  return (
    <>
      <Background />
      <motion.group
        ref={characterGroup}
        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        animate={"" + section}
        transition={{ duration: 0.6 }}
        scale={[officeScaleRation,officeScaleRation,officeScaleRation]}
        variants={{
          0: {
            scaleX: officeScaleRation,
            scaleY: officeScaleRation,
            scaleZ: officeScaleRation,
          },
          1: {
            y: -viewport.height + 0.5,
            x: isMobile ? 0.3 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 2 : 0,
            rotateZ: 0,
            scaleX:isMobile ? 1.5:1,
            scaleY:isMobile ? 1.5:1,
            scaleZ:isMobile ? 1.5:1,
          },
          2: {
            x:isMobile ? 1.4 : -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX:1,
            scaleY:1,
            scaleZ:1,
          },

          3: {
            y: -viewport.height * 3 + 1,
            x: 0.3,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
          },
        }}
      >
        <Avatar animation={charecterAnimation} wireframe={section === 1} />
      </motion.group>
      <ambientLight intensity={1} />

      <motion.group
      
        position={[isMobile ? 0 : 1.5 * officeScaleRation, isMobile ? -viewport.height / 6 : 2, 3]}
        scale={[officeScaleRation,officeScaleRation,officeScaleRation]}
        rotation-y={-Math.PI / 4}
        animate={{
            y: isMobile ? -viewport.height / 6 : 0,
          }}
          transition={{
            duration: 0.8,
          }}
  
        
      >
        <Office section={section} />
        <group
        ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.24, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>

      <motion.group
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : (isMobile ? -viewport.height : -1.5 * officeScaleRation),
        }}
        position={[0, isMobile ? -viewport.height :  -1.5 * officeScaleRation, -10]}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
      </motion.group>
      <Projects />
    </>
  );
};
