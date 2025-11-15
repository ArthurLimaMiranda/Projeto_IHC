import { MaquinasInfo } from "./MaquinasInfo";
import Image from "next/image";
import StandardModal from '../public/assets/StandardModal.png'
import MaxModal from '../public/assets/MaxModal.png'
import PlusModal from '../public/assets/PlusModal.png'
import OtherModal from '../public/assets/OtherModal.png'

import Standard from '../public/assets/StandardMini.png'
import Max from '../public/assets/MaxMini.png'
import Plus from '../public/assets/PlusMini.png'
import Other from '../public/assets/OtherMini.png'

interface TextProps{
  isSelected: boolean,
  maquina: number
  saibaMais: string,
  maquinaInfoBundle: { title: string; description: string; dimensao: string; list: string[]; capacidade: string; },
  software: string
}

const ImageModalSrc = [StandardModal.src, MaxModal.src, PlusModal.src, OtherModal.src]
const ImageSrc = [Standard, Max, Plus, Other]

export function MaquinasInicioBut(props:TextProps){

  return(
    <div className={`flex flex-col text-gray-500 text-left py-3 md:py-6 px-4 gap-4 ${props.isSelected&&'border-l-green-1300 border-l'}`}>
      <p className="font-semibold text-base"> {props.maquinaInfoBundle.title} </p>
      <p className="text-base">{props.maquinaInfoBundle.description}</p>      
      {props.isSelected&&(
      <MaquinasInfo saibaMais={props.saibaMais} maquinaInfoBundle={props.maquinaInfoBundle} software={props.software} maquinaImgScr={ImageModalSrc[props.maquina-1]}/>
      )}
    </div>
  )
}

export function MaquinSolucoesBut(props:TextProps){

  return(
    <div className="flex flex-col text-left px-4 w-full justify-center items-center">
      <div className="min-h-[330px] min-w-[330px] max-h-[330px] md:min-h-[470px] md:min-w-[470px] md:max-h-[470px] xl:min-h-[270px] xl:min-w-[270px] xl:max-h-[270px] relative">  
        <Image src={ImageSrc[props.maquina-1]} alt={"Recicletool "+props.maquinaInfoBundle.title} layout="fill" objectFit="cover" className="w-full h-auto rounded-t-3xl xl:rounded-3xl xl:bg-transparent bg-gray-1200"/>
      </div>
      <div className="flex flex-row items-center justify-between xl:items-start gap-x-10 xl:gap-x-0 xl:flex-col w-[333px] md:w-[473px] xl:w-full py-5 xl:py-3 gap-y-3  px-[9%] xl:px-2 xl:bg-transparent bg-gray-1200 rounded-b-3xl">
        <p className="text-2xl md:text-3xl font-semibold xl:font-normal"> {props.maquinaInfoBundle.title} </p>  
        <MaquinasInfo saibaMais={props.saibaMais} maquinaInfoBundle={props.maquinaInfoBundle} software={props.software} maquinaImgScr={ImageModalSrc[props.maquina-1]}/>
      </div>
    </div>
  )
}