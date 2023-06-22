
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
  const {  menuOpened } = props;
  const { viewport } = useThree();
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const data = useScroll();

  const [section,setSection] = useState(0)
  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...frameMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...frameMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [ charecterAnimation , setCharecterAnimation] = useState('Typing');

  useEffect(()=>{
setCharecterAnimation('Falling');
setTimeout(() => {
    setCharecterAnimation(section === 0 ? 'Typing' : 'Standing');

}, 600);
  },[section])
  useFrame((state) => {

    let curSection = Math.floor(data.scroll.current * data.pages);


    if(curSection > 3){
        curSection=3;
    }
if(curSection !== section){
    setSection(curSection)
}

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });
  return (
    <>
    <Background/>
      <motion.group
        position={[1.9072935059634513, 0.14400000000000002, 2.681801948466054]}
        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        animate={"" + section}
        transition={{ duration: 0.6 }}
        variants={{
          0: {
            scaleX: 0.9,
            scaleY: 0.9,
            scaleZ: 0.9,
          },
          1: {
            y: -viewport.height + 0.5,
            x: 0,
            z: 7,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          },
          2: {
            x: -2,
            y: -viewport.height * 2 + 0.5,
            z:0,
            rotateX:0,
            rotateY:Math.PI / 2,
            rotateZ:0,
          },

          3:{
            y:-viewport.height * 3 +1,
            x:0.3,
            z:8.5,
            rotateX:0,
            rotateY:-Math.PI / 4,
            rotateZ:0,
          }

          
        }}
      >
        <Avatar animation={charecterAnimation} />
      </motion.group>
      <ambientLight intensity={1} />

      <motion.group
        animate={{
          y: section === 0 ? 0 : -1,
        }}
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
      >
        <Office section={section} />
        <group
          name="CharacterSpot"
          position={[0.07, 0.24, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>

      <motion.group
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
        position={[0, -1.5, -10]}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />

       


       
      </motion.group>
      <Projects/>
    </>
  );
};
