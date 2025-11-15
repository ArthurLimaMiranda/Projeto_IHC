import Image from "next/image";
import Link from "next/link";
import CTAMachine from '../public/assets/CTAMachine.png'

import { getScopedI18n } from "@/locales/server";

export async function CTA(){

    const t = await getScopedI18n('cta')
    const u = await getScopedI18n('contact.top')

    return(
      <div className="bg-green-1400 text-white py-20 xl:py-[7rem] px-10 xl:px-16">
          <div className="flex gap-y-10 flex-col xl:flex-row text-center justify-between">
            <div className="xl:w-[20.5rem]">
              <p className="text-[2rem] md:text-5xl text-center xl:text-left font-bold">{t('title')}</p>
            </div>
            <div className="flex flex-col text-center items-center xl:items-start xl:text-left xl:w-[45rem] gap-y-10">
              <p>{t('text')}</p>
              <Link className="bg-green-1300 text-green-1400 hover:bg-green-50 rounded-full text-center w-auto px-6 py-1.5" href="/contact">
                {u('heading')}
              </Link>
            </div>
          </div>
          <div className="w-full mt-12 h-[15rem] md:h-[50rem] overflow-hidden relative rounded-[1.9rem]">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src={CTAMachine} alt="CTA Machine" layout="fill" objectFit="cover" objectPosition="center"/>
            </div>
          </div>
      </div>
    )
}

