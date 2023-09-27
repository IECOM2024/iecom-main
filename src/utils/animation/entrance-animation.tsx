import { motion } from "framer-motion";
import { duration } from "moment";
import { useEffect, useState } from "react";

export const Pops = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div
      animate={{ opacity: [0, 0.9, 1], scale: [0.3, 1.05, 1] }}
      transition={{ duration: 0.3, times: [0, 0.8, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const StepPops = ({ children }: { children: JSX.Element[] }) => {
  const [step, setStep] = useState(0);

  const totalSteps = children.length;
  useEffect(() => {
    if (step < totalSteps) {
      setTimeout(() => {
        setStep((s) => s + 1);
      }, 100);
    }
  }, [step, totalSteps]);
  return (
    <>
      {children.map((e, i) =>
        i <= step ? <Pops key={i}>{e}</Pops> : <div key={i} />
      )}
    </>
  );
};

export const OpacityAnim = ({ children,time }: { children: JSX.Element,time?:number }) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: time ?? 0.3, times: [0, 1] }}
    >
      {children}
    </motion.div>
  );
};

interface slideProps {
  children: JSX.Element
  from: "right" | "left" | "top" | "bottom"
  duration?: number
}

export const Slide = ({ children, from, duration}: slideProps) => {
  const initX = from == "right" ? 1080 : from == "left" ? -1080 : 0 
  const initY = from == "top" ? 640 : from == "bottom" ? -640 : 0

  return <motion.div 
    initial={{ position: "relative", top: initY, left: initX}}
    animate={{ top: [initY,0], left: [initX,0]}}
    transition={{duration: duration ?? 1}}
    >{children}</motion.div>
}