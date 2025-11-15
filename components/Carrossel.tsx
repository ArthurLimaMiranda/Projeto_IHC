'use client'
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import img01 from '../public/assets/CarrosselImg1.jpg'
import img02 from '../public/assets/CarrosselImg2.png'
import img03 from '../public/assets/CarrosselImg3.jpg'
import img04 from '../public/assets/CarrosselImg4.png'
import img05 from '../public/assets/CarrosselImg5.png'
import img06 from '../public/assets/CarrosselImg6.png'
import img07 from '../public/assets/CarrosselImg7.png'
import img08 from '../public/assets/CarrosselImg8.png'
import img09 from '../public/assets/CarrosselImg9.png'
import img10 from '../public/assets/CarrosselImg10.png'

import imgSelec01 from '../public/assets/CarrosselSelecImg1.png'

const imagesCont = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10];

const imagesSelec = [img01,imgSelec01];

interface TextProps{
  titleArr: string[],
  textArr: string[],
}
export function CarrosselContinuo() {

  const carrossel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0)
 
  useEffect(() => {
    if (carrossel.current) {
      setWidth(carrossel.current.scrollWidth - carrossel.current.offsetWidth);
    }
  }, []);
  

  return (
    <div className="bg-green-1300 w-full flex items-center justify-center py-[2rem] md:py-[4.5rem] px-3 md:px-14 min-h-full">
      <motion.div className="cursor-grab overflow-hidden rounded-md" whileTap={{cursor:"grabbing"}} ref={carrossel}>
        <motion.div 
          className="flex" 
          drag={'x'} 
          dragConstraints={{right:0, left:-width}}
          initial={{x:50}}
          animate={{x:0}}
          transition={{duration:0.8}}>
          {imagesCont.map((img, index) => (
            <motion.div key={index} className="min-h-[300px] min-w-[300px] max-h-[300px] md:min-h-[400px] md:min-w-[400px] md:max-h-[400px] mx-3 relative"> 
              <Image src={img} alt={`Carrossel Image ${index + 1}`} layout="fill" objectFit="cover" className="w-full h-auto rounded-3xl pointer-events-none"/>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CarrosselSelection(props:TextProps) {

  function alteraCarrossel(lado:number){
    if(lado==0){
      setCurrentSlide(currentSlide-1)
      if(currentSlide<=0){
        setCurrentSlide(imagesSelec.length-1)
      }
    }

    else{
      setCurrentSlide(currentSlide+1)
      if(currentSlide>imagesSelec.length-2){
        setCurrentSlide(0)
      }
    }
  }
  
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <>
      <div className="relative min-w-[50%] min-h-[600px]">
        <Image src={imagesSelec[currentSlide]} alt={`Reportagem ${currentSlide + 1}`} layout="fill" objectFit="cover"/>
      </div>
      <div className="bg-gray-1100 py-6 justify-center md:items-start items-center flex flex-col px-12">
          <p className="text-green-1400 text-xl font-medium">{props.titleArr[currentSlide]}</p>
          <p>{props.textArr[currentSlide]}</p>
          <div className="w-full flex flex-1 justify-end gap-x-3 mt-2">
            <button className="border rounded-full text-3xl p-2 hover:bg-gray-1300" onClick={()=>alteraCarrossel(0)}>{'<-'}</button>
            <button className="border rounded-full text-3xl p-2 hover:bg-gray-1300" onClick={()=>alteraCarrossel(1)}>{'->'}</button>
          </div>
      </div>
    </>
  );
}
