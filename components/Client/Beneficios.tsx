import Image from "next/image";
import Link from "next/link";
import CTAMachine from '../public/assets/CTAMachine.png'

import { getScopedI18n } from "@/locales/server";
import { Benef2 } from "./Benef2";
import { Benef1 } from "./Benef1";

export async function Beneficios(){

  const t = await getScopedI18n('home.benefits')
  const u = await getScopedI18n('btn')

  return(
    <div className="bg-gray-1400 text-white py-20 xl:pt-[7rem] xl:px-20 px-10">
        <div className="w-full">
          <p className="text-4xl lg:text-5xl xl:px-[29rem] text-center text-gray-500 font-semibold md:font-normal">{t('title')}</p>
        </div>

        <Benef1/>
        <Benef2/>

        <div className="justify-center w-full flex">
          <Link href="/contact">
            <p className="text-green-1400 hover:border-b-green-100 hover:text-gray-300 font-medium text-lg border-b border-b-green-1300 w-auto">{u('quote') + ' ->'} </p>
          </Link>
        </div>
    </div>
  )
}

