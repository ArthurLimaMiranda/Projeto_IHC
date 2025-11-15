'use client'
import Image from "next/image";
import img01 from '../public/assets/Standard.png'
import img02 from '../public/assets/Max.png'
import img03 from '../public/assets/Plus.png'
import img04 from '../public/assets/Other.png'

import { useState } from "react";
import { MaquinasInicioBut } from "./MaquinasBut";

interface TextProps{
  title: string,
  saibaMais: string,
  maquinaInfoBundle: any,
  software: string
}

export function Solucoes(props:TextProps){  

  const [currentSelected, setCurrentSelected] = useState(0);
  const [currentImg, setCurrentImg] = useState(img01);

  return(
    <div className="mt-12 mb-12 md:mt-[7.6rem] px-10">
      <p className="text-5xl text-center font-semibold md:font-normal text-green-1400" id="solucoes"> 
        {props.title}  
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center bg-gray-1500 text-gray-500 pt-8 md:pt-[4.5rem] md:px-14 gap-x-14 gap-y-12">
        <div className="flex flex-col justify-between overflow-y-scroll xl:overflow-y-visible h-80 w-90 md:h-[30rem] md:w-full xl:h-full gap-y-5 md:gap-y-0"> 
          <button className="hover:bg-gray-50 hover:rounded-r-2xl" onClick={()=>{setCurrentSelected(0); setCurrentImg(img01)}}>
            <MaquinasInicioBut 
              isSelected={(currentSelected==0)?true:false}
              maquina={1}
              saibaMais={props.saibaMais}
              maquinaInfoBundle={props.maquinaInfoBundle[0]}
              software={props.software}/>
          </button>
          <button className="hover:bg-gray-50 hover:rounded-r-2xl" onClick={()=>{setCurrentSelected(1); setCurrentImg(img02)}}>
            <MaquinasInicioBut 
              isSelected={(currentSelected==1)?true:false}
              maquina={2}
              saibaMais={props.saibaMais}
              maquinaInfoBundle={props.maquinaInfoBundle[1]}
              software={props.software}/>
          </button>
          <button className="hover:bg-gray-50 hover:rounded-r-2xl" onClick={()=>{setCurrentSelected(2); setCurrentImg(img03)}}>
            <MaquinasInicioBut 
              isSelected={(currentSelected==2)?true:false}
              maquina={3}
              saibaMais={props.saibaMais}
              maquinaInfoBundle={props.maquinaInfoBundle[2]}
              software={props.software}/>
            </button>
          <button className="hover:bg-gray-50 hover:rounded-r-2xl" onClick={()=>{setCurrentSelected(3); setCurrentImg(img04)}}>
            <MaquinasInicioBut 
              isSelected={(currentSelected==3)?true:false}
              maquina={4}
              saibaMais={props.saibaMais}
              maquinaInfoBundle={props.maquinaInfoBundle[3]}
              software={props.software}/>
            </button>
        </div>
        <Image className="w-80 h-80 md:w-[30rem] md:h-[30rem] xl:w-[50rem] xl:h-[50rem]" src={currentImg} alt="Máquina Recicletool selecionada"/>
      </div>
    </div>
  )
}

