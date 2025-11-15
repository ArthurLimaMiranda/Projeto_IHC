import Image from "next/image";
import Link from "next/link";
import arcomix from '../public/assets/arcomix.svg'
import centerbox from '../public/assets/centerbox.svg'
import coca_logo from '../public/assets/Coca-Cola_logo.svg'
import heineken_logo from '../public/assets/Heineken_Logo.svg'
import nestle from '../public/assets/Nestlé.svg'
import recibom from '../public/assets/recibom.svg'

import arcomixBranco from '../public/assets/arcomixBranco.svg'
import centerboxBranco from '../public/assets/centerboxBranco.svg'
import coca_logoBranco from '../public/assets/Coca-Cola_logoBranco.svg'
import heineken_logoBranco from '../public/assets/Heineken_LogoBranco.svg'
import nestleBranco from '../public/assets/NestleBranco.svg'
import recibomBranco from '../public/assets/recibomBranco.svg'

import { getScopedI18n } from "@/locales/server";

export async function MarcasPreto(){

    const t = await getScopedI18n('logos')
    const u = await getScopedI18n('btn')

    return(
      <div className="flex flex-col bg-gray-1100 text-gray-500 gap-y-20 py-20 px-10 md:px-16 items-center">
        <div className="w-full">
          <p className="text-3xl md:text-5xl text-center font-semibold md:font-normal">{t('title')}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-y-11 items-center w-full justify-between">
          <Image src={recibom} alt="recibom Logo"/>
          <Image src={arcomix} alt="arcomix Logo"/>
          <Image src={centerbox} alt="centerbox Logo"/>
          <Image src={heineken_logo} alt="heineken Logo"/>
          <Image src={nestle} alt="nestle Logo"/>
          <Image src={coca_logo} alt="coca cola Logo"/>
        </div>

        <div className="w-full items-center gap-8 pt-16 flex flex-col md:flex-row justify-between border-t border-t-green-1300 md:pt-6 px-6">
          <div className="w-[20rem] text-center md:text-left md:w-[27rem]">
            <p>{t('text')}</p>
          </div>
          <div className="flex w-auto bg-green-1300 hover:bg-green-50 rounded-full text-center items-center justify-center px-6 py-1">
            <Link href="/contact">
              <p>{u('quote')}</p>
            </Link>
          </div>
        </div>
      </div>
    )
}

export async function MarcasBranco(){

  const t = await getScopedI18n('logos')
  const u = await getScopedI18n('btn')

  return(
    <div className="flex flex-col xl:flex-row bg-green-1400 text-white gap-y-20 py-20 px-16 items-center">
      <div>
        <p className="text-3xl text-center font-semibold xl:font-normal">{t('title')}</p>
      </div>

      <div className="flex flex-col w-full justify-between items-center gap-y-11 xl:gap-y-10">
        <div className="flex flex-col items-center xl:flex-row gap-x-10 gap-y-11">
          <Image src={recibomBranco} alt="recibom Logo"/>
          <Image src={arcomixBranco} alt="arcomix Logo"/>
          <Image src={centerboxBranco} alt="centerbox Logo"/>
          <Image src={heineken_logoBranco} alt="heineken Logo"/>
        </div>

        <div className="flex flex-col items-center xl:flex-row gap-x-10 gap-y-11">
          <Image src={nestleBranco} alt="nestle Logo"/>
          <Image src={coca_logoBranco} alt="coca cola Logo"/>
        </div>
      </div>
    </div>
  )
}

