'use client'
import { useCurrentLocale } from '@/locales/client'
import { motion, useAnimate, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";

interface TextProps{
  titleFirstLine: string,
  titleSecondLine: string[],
}

export function Banner(props:TextProps) {
  const currentLocale = useCurrentLocale()
  const [palavraAtual, setPalavra] = useState(0);
  const [scope, animate] = useAnimate()
  const y = useMotionValue(110);

  useEffect(() => {
    animate(scope.current, { y:0 }, { duration: 0.2, onComplete() {
      animate(scope.current, { y:-150 }, { duration: 0.2, delay: 2})
    },})
  });
  
  function mudaPalavra(latest:any){
    if(latest.y<-110){
      y.set(210)
      setPalavra(palavraAtual+1)
      if(palavraAtual >= props.titleSecondLine.length-1){
        setPalavra(0)
      }
      animate(scope.current, { y:0 }, { duration: 0.2, onComplete() {
        animate(scope.current, { y:-150 }, { duration: 0.2, delay: 3})
      },})
    }
  }

  return (
      <div className="flex flex-col sm:gap-y-8 md:pb-[6.8rem] md:pt-10 items-center text-5xl text-center font-semibold md:font-normal sm:text-7xl md:text-8xl">
        <p className="text-gray-500">{props.titleFirstLine}</p>
        <div className="overflow-y-auto">
          <motion.p
            ref={scope}
            onUpdate={mudaPalavra}
            style={{ y }}
            className={`text-green-1300 ${(currentLocale=='et')?('h-[8rem] md:h-[7.3rem]'):('h-[5rem] md:h-[7.3rem]')}`}>
            {props.titleSecondLine[palavraAtual]}
          </motion.p>
        </div>
      </div>
  );
}

