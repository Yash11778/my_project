import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "../assets";
import { brainwaveServices, brainwaveServicesIcons } from "../constants";
import { Gradient, GradientLight } from "./design/Services";

import { motion } from "framer-motion";
import { TagSphere } from "./TagSphere";

const Services = () => {
  return (
    <Section id="services">
      <div className="container">
        <Heading
          title="HacKronyX Themes"
          text="Dive deep into these cutting-edge domains and innovate solutions that make a difference."
        />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]"
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <TagSphere />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">Explore HackRonyX Themes</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Choose a theme that inspires you and create innovative solutions that address real-world challenges.
              </p>
              <ul className="flex flex-col gap-3">
                {brainwaveServices.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 border border-n-1/10 rounded-xl"
                  >
                    <img src={check} width={24} height={24} alt="check" />
                    <p className="body-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Gradient />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative z-1 grid gap-5 lg:grid-cols-2"
          >
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={service2}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="Prototype"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">Turn Ideas into Prototypes</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Leverage your skills to create functional prototypes that solve real-world challenges during our 36-hour coding marathon.
                </p>
              </div>

              <GradientLight />
            </div>

            <div className="overflow-hidden pb-5 border border-n-1/10 rounded-3xl lg:min-h-[46rem]">
              <div className="p-8 xl:p-15">
                <h4 className="h4 mb-4">Present Your Innovation</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  Showcase your solution to industry experts and academic professionals during the final evaluation and project expo.
                </p>

                <ul className="flex flex-col gap-5">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-6 p-5 border border-n-1/10 rounded-xl"
                    >
                      <img src={item} width={24} height={24} alt="Feature icon" />
                      <p className="body-2">{brainwaveServices[index]}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] mt-auto overflow-hidden md:h-[25rem]">
                <img
                  src={service3}
                  className="w-full h-full object-cover"
                  width={630}
                  height={750}
                  alt="Album arts"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Services;
