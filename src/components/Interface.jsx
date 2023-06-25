import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { useForm, ValidationError } from '@formspree/react';

const Section = (props) => {
  const { children,mobileTop } = props;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
      className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex  flex-col  items-start  ${mobileTop ? 'justify-start md:justify-center' : 'justify-center'}`}
    >
      {children}
    </motion.section>
  );
};

const AboutSection = (props) => {
    const {setSection} = props;

  return (
    <Section mobileTop>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi , I'm <br /> <br />
        <span className="bg-white px-1  italic">Kenan Boyukkishiyev</span>{" "}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
        className="text-lg text-white mt-4"
      >
        I Front-End Developer and I make good websites
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 25 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2.5,
        }}
        onClick={()=>setSection(3 )}
        className={`bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4 md:mt-16`}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 40,
  },
  {
    title: "vue / nuxt / vuex",
    level: 60,
  },

  {
    title: "Git",
    level: 50,
  },

  {
    title: "Css/Scss",
    level: 80,
  },

  {
    title: "Html",
    level: 80,
  },
];

const languages = [
  {
    title: "Russian",
    level: 70,
  },

  {
    title: "English",
    level: 50,
  },

  {
    title: "Turkish",
    level: 60,
  },

  {
    title: "Azerbaijan",
    level: 100,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <h2 className="text-3xl  md:text-5xl font-bold text-white">Skills</h2>

        <div className="mt-8 space-y-4 ">
          {skills.map((skill, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.h3
                initial={{ opacity: 0 }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
                className="text-lg md:text-xl font-bold text-gray-100"
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                 
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-3xl  md:text-5xl font-bold mt-10 text-white">Languages</h2>
          <div className="mt-8 space-y-4">
            {languages.map((language, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  initial={{ opacity: 0 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                  className="text-lg md:text-xl font-bold text-gray-100"
                >
                  {language.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                   initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${language.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};


const ProjectsSection = () => {
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };
return(
    <Section>
        <div className="flex w-full h-full gap-8 items-center justify-center">
            <button className="hover:text-indigo-600 transition-colors" onClick={previousProject}>  ← Previous </button>
            <h2 className="text-3xl  md:text-5xl font-bold">Projects</h2>
            <button className="hover:text-indigo-600 transition-colors" onClick={nextProject}>Next →</button>

        </div>
    </Section>
)
}



const ContactSection = () => {
  const [state, handleSubmit] = useForm("maygwqew");

  return (
    <Section>
      <h2 className="text-3xl  md:text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
           { state.succeeded ? (
                <p className="text-green-500"> thenks for your message</p>
            ) : (

        <form onSubmit={handleSubmit}>

          <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
          <label
            htmlFor="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />
           <ValidationError 
                  className='mt-1 text-red-500'

        prefix="Email" 
        field="email"
        errors={state.errors}
      />
          <label
            htmlFor="email"
            className="font-medium text-gray-900 block mb-1 mt-8"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
          />

<ValidationError 
       className='mt-1 text-red-500'
        errors={state.errors}
      />
          <button type="submit" disabled={state.submitting} className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
            Submit
          </button>
        </form>
        )}

      </div>
    </Section>
  );
};

export const Interface = (props) => {
    const {setSection} = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />

      <ProjectsSection/>

      <ContactSection />
    </div>
  );
};
