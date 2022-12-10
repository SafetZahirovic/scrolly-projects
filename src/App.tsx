import { motion, useScroll, ScrollMotionValues } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Scrollama, Step } from "react-scrollama";
import "./App.css";
import { DashboardFirstStep } from "./components/dashboard/first";
import { DashboardSecondStep } from "./components/dashboard/second";
import { DocsiteFirstStep } from "./components/docsite/first";
import { DocsiteSecondStep } from "./components/docsite/second";
import { LoggerFirstStep } from "./components/logger/first";
import { LoggerSecondStep } from "./components/logger/second";
import "./i18n/config";
type Position = "left" | "right";

declare global {
  interface Number {
    between: (a, v) => boolean;
  }
}
Number.prototype.between = function (a, b) {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return this! > min && this! < max;
};
type StepMetaData = {
  text: string;
  step: number;
  component: () => JSX.Element;
  background: string;
  accent: string;
  left: string | null;
  right: string | null;
  textPosition: Position;
  textShadow: string;
};

const components: Array<StepMetaData> = [
  {
    text: "Hovedprosjektet jeg jobber med handler om innsamling av bruker data. Der jobber jeg med frontend biten av data innsamling, samt lager SQL spørringer og lager dashboards.",
    step: 1,
    component: LoggerFirstStep,
    background: "bg-green-100",
    accent: "bg-green-300",
    left: "0%",
    right: null,
    textPosition: "right",
    textShadow: "rgb(220 252 231 / var(--tw-bg-opacity))",
  },
  {
    text: "Verktøyeme og språkene brukt i prosjektet er Typescript, Google Cloud (BigQuery), AirFlow for aggregering av data og Looker for data visualisering.",
    step: 2,
    component: LoggerSecondStep,
    background: "bg-green-100",
    accent: "bg-green-300",
    left: "0%",
    right: null,
    textPosition: "right",
    textShadow: "rgb(220 252 231 / var(--tw-bg-opacity))",
  },
  {
    text: 'Driver også med en del side prosjekter. En av dem er å lage en "dependency dashboard".',
    step: 3,
    component: DashboardFirstStep,
    background: "bg-purple-100",
    accent: "bg-purple-300",
    right: "0%",
    left: null,
    textPosition: "left",
    textShadow: "rgb(243 232 255 / var(--tw-bg-opacity))",
  },
  {
    text: "Denne gjør at vi mapper pakke avhengigheter innad frontend sfæren. Verktøyene jeg brukte her var Svelte, Node og Google Cloud (Cloud Functions og Cloud Storage).\nNår en ny pakke publiseres, sendes det en slack melding til alle appene som avhenger av pakken.",
    step: 4,
    component: DashboardSecondStep,
    background: "bg-purple-100",
    accent: "bg-purple-300",
    right: "0%",
    left: null,
    textPosition: "left",
    textShadow: "rgb(243 232 255 / var(--tw-bg-opacity))",
  },
  {
    text: "Et til prosjekt er en kode sandkasse. Denne kan brukes for å teste kode med interne pakker, og kan brukes som live kodings verktøy.",
    step: 5,
    component: DocsiteFirstStep,
    background: "bg-teal-100",
    accent: "bg-teal-300",
    right: null,
    left: "0%",
    textPosition: "right",
    textShadow: "rgb(204 251 241 / var(--tw-bg-opacity))",
  },
  {
    text: "Teknologier brukt i dette prosjektet var SvelteKit, Node, Google Cloud (Firestore) og WebRTC for sanntids koding.",
    step: 6,
    component: DocsiteSecondStep,
    background: "bg-teal-100",
    accent: "bg-teal-300",
    right: null,
    left: "0%",
    textPosition: "right",
    textShadow: "rgb(204 251 241 / var(--tw-bg-opacity))",
  },
];

const getComponentFromStep = (currStep: number) =>
  components.find(({ step }) => step === currStep);

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const { t } = useTranslation();
  const [x, setX] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const onStepEnter = ({ data }: { data: number }) => {
    setCurrentStepIndex(data);
  };
  const spring = {
    type: "spring",
    damping: 60,
    stiffness: 300,
  };

  return (
    <div className="h-full bg-[#FFFDFA]">
      <div className="text-3xl font-bold h-[100vh]">
        <Scrollama offset={0.5} onStepEnter={onStepEnter}>
          {components.map(({ text, background, textPosition }, stepIndex) => (
            <Step data={stepIndex} key={stepIndex}>
              <div
                style={{
                  transition: "all .5s ease",
                  WebkitTransition: "all .5s ease",
                  MozTransition: "all .5s ease",
                  justifyContent: textPosition,
                }}
                className={` flex h-full w-full align-middle justify-center items-center`}
              >
                <div className={`h-[25%] w-6/12 p-12`}>
                  {/* <div className="bg-black absolute w-full h-[20px] opacity-10"></div> */}
                  <div className="post-heading text-left">
                    <span
                      className="opacity-1"
                      style={{
                        boxShadow: `inset 0 -0.5em 0 ${
                          getComponentFromStep(currentStepIndex + 1)?.textShadow
                        }`,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                </div>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
      <motion.div
        ref={ref}
        initial={false}
        animate={{
          /* x: getComponentFromStep(currentStepIndex + 1)?.position, */
          position: "fixed",
          top: "0%",
          height: "100vh",
          left: getComponentFromStep(currentStepIndex + 1)?.left!,
          right: getComponentFromStep(currentStepIndex + 1)?.right!,
          width: "50vw",
        }}
        transition={spring}
        className={` ${getComponentFromStep(currentStepIndex + 1)?.accent}`}
      >
        {getComponentFromStep(currentStepIndex + 1)?.component()}
      </motion.div>
    </div>
  );
}

export default App;
