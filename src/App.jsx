import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { Suspense, useEffect, useState } from "react";
import { ScrollManager } from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import {frameMotionConfig} from './config'
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";
function App() {

    const [section,setSection] = useState(0);
    const [menuOpened,setMenuOpened] = useState(false);
    const [started,setStarted] = useState(false);

    useEffect(() => {
        setMenuOpened(false)
    },[section])
  return (
    <>
    <LoadingScreen started={started} setStarted={setStarted}/>
    <MotionConfig transition={{
       ...frameMotionConfig
    }}>

      <Canvas shadows camera={{ position: [0,3,10], fov: 42 }}>
      <color attach="background" args={["#e6e7ff"]} />
        <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />

            <Scroll>
                <Suspense>
{started && (
            <Experience menuOpened={menuOpened}  section={section}/>

)}
            </Suspense>

            </Scroll>

          <Scroll html>
          {started && (  <Interface setSection={setSection}/> )}
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
      <Cursor/>
      </MotionConfig>

      <Leva hidden/>
   
    </>
  );
}

export default App;
