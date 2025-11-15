'use client'
import Image from "next/image";
import imgDft from '../public/assets/foto_Default.png'
import img01 from '../public/assets/foto_01.png'
import vector from '../public/assets/Vector.svg'

import { useState, useEffect } from "react";

interface TextProps{
  title: string,
  cokeTitle: string,
  cokeText: string,
  heinekenTitle: string,
  heinekenText: string,
  saibaMais: string
}

export function Produtos(props:TextProps){

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [imgDft, img01]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  

  return(
    <div className="flex flex-col bg-gray-1400 text-gray-500 gap-y-12 md:gap-y-[4.5rem] py-[6.3rem] px-10 md:px-16 items-center">
      <div className="w-full">
        <p className="text-4xl md:text-5xl font-semibold md:font-normal text-center">{props.title}</p>
      </div>

      <div className="flex flex-col md:flex-row w-full items-center gap-y-12 justify-between gap-x-[4.5rem]">
        <Image src={images[currentIndex]} alt="projetos" className="h-80 w-80 md:h-[60%] md:w-[60%]"/>
        <div className="flex flex-col justify-center gap-y-12">

          <div className="flex items-center md:items-start gap-x-5"> 
            <Image src={vector} alt="vector" className="pt-2"/>
            <div>
              <p className="font-bold text-lg">{props.cokeTitle}</p>
              <p>{props.cokeText}</p>

              {/*<Link href="/contact">
                <p className="mt-5 text-green-1400 hover:border-b-green-100 hover:text-gray-300 font-medium text-lg border-b border-b-green-1300 w-[12rem]">{props.saibaMais + ' ->'} </p>
              </Link>*/}
            </div>
          </div>

          <div className="flex items-center md:items-start gap-x-5"> 
            <Image src={vector} alt="vector" className="pt-2"/>
            <div>
              <p className="font-bold text-lg">{props.heinekenTitle}</p>
              <p>{props.heinekenText}</p>

              {/*<Link href="/contact">
                <p className="mt-5 text-green-1400 hover:border-b-green-100 hover:text-gray-300 font-medium text-lg border-b border-b-green-1300 w-[12rem]">{props.saibaMais + ' ->'} </p>
              </Link>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

