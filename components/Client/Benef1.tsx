import Image from "next/image";
import img01 from '../public/assets/ImageBenef1.png'
import vector1 from '../public/assets/beneficios1.svg'
import vector2 from '../public/assets/beneficios2.svg'
import { getScopedI18n } from "@/locales/server";

export async function Benef1(){  

  const t = await getScopedI18n('home.benefits')

  return(
    <div className="flex flex-col bg-gray-1400 text-gray-500 pt-[4.9rem] md:px-16 items-center">
      <div className="flex flex-col md:flex-row w-full justify-between items-center gap-y-10 gap-x-[10rem]">
        <div className="flex flex-col justify-center gap-y-10 md:gap-y-28">
          <div className="flex items-center md:items-start gap-x-8">
            <Image src={vector1} alt="Destinação" className="pt-2"/>
            <div>
              <p className="text-left text-base md:text-justify md:text-lg text-gray-500">{t('destination')}</p>
            </div>
          </div>
          <div className="flex items-center md:items-start gap-x-8"> 
            <Image src={vector2} alt="Fidelização" className="pt-2"/>
            <div>
              <p className="text-left text-base md:text-justify md:text-lg text-gray-500">{t('fidelization')}</p>
            </div>
          </div>
        </div>
        <Image src={img01} className="h-80 w-80 md:h-full md:w-full" alt="Maquina 'Recicle e ganhe Desconto'"/>
      </div>
    </div>
  )
}

