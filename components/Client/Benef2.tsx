import Image from "next/image";
import img01 from '../public/assets/ImageBenef2.png'
import vector1 from '../public/assets/beneficios3.svg'
import vector2 from '../public/assets/beneficios4.svg'
import { getScopedI18n } from "@/locales/server";

export async function Benef2(){  

  const t = await getScopedI18n('home.benefits')

  return(
    <div className="flex flex-col bg-gray-1400 text-gray-500 py-[4.9rem] md:px-16 items-center">
      <div className="flex flex-col md:flex-row w-full justify-between items-center gap-y-10 gap-x-[10rem]">
        <Image src={img01} className="hidden md:flex md:h-full md:w-full" alt="Imagem Tablet"/>
        <div className="flex flex-col justify-center gap-y-10 md:gap-y-28">
          <div className="flex items-center md:items-start gap-x-8">   
            <Image src={vector1} alt="Aumento de vendas" className="pt-2"/>
            <div>
              <p className="text-left text-base md:text-justify md:text-lg text-gray-500">{t('growth')}</p>
            </div>
          </div>
          <div className="flex items-center md:items-start gap-x-8">  
            <Image src={vector2} alt="Legalidade" className="pt-2"/>
            <div>
              <p className="text-left text-base md:text-justify md:text-lg text-gray-500">{t('conformity')}</p>
            </div>
          </div>
        </div>
        <Image src={img01} className="h-80 w-80 md:hidden" alt="Imagem Tablet"/>
      </div>
    </div>
  )
}

