'use client'
import Image from "next/image";
import imgDft from '../public/assets/foto_Default.png'
import img01 from '../public/assets/foto_01.png'
import vector from '../public/assets/Vector.svg'

import { useState, useEffect } from "react";



const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum nec massa quis porta. Suspendisse rutrum, eros rutrum faucibus ornare. "

export function Produtos2(){

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [imgDft, img01, img01]
  

  return(
    <div className="flex flex-col bg-gray-1400 text-gray-500 gap-y-[4.5rem] pt-[6.3rem] px-10 md:px-16 items-center">
      <div className="flex flex-row w-full items-center gap-y-12 justify-between gap-x-[3.5rem] px-[1vw]">        
        <div className="flex flex-col justify-center gap-y-12">

          <p className="font-bold text-6xl text-[#fdac12]">Escolha sua rota</p>
          <p className="text-xl text-justify">{lorem}</p>

        </div>

        <div className="flex flex-row w-full h-full gap-x-[1.5rem]">
          {images.map((image, index) => (
            <div key={index} className="relative w-[20vw] h-[60vh] bg-slate-500 rounded-[3rem] overflow-hidden text-start flex flex-col justify-end">
              {/*<Image src={image} alt="projetos" layout="fill" objectFit="cover" className="z-10"/>*/}
              <div className="py-14 px-10 gap-y-5 flex flex-col z-20 relative text-4xl text-white">
                <p className="font-bold ">Rota 1</p>
                <button className="text-white border border-white rounded-full text-3xl hover:opacity-70 py-1 w-[60%]">
                  join
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

