import Image from "next/image";
import Link from "next/link";
import RecicletoolLogo from '../public/assets/logo.svg'
import Linkedin from '../public/assets/linkedin-in.svg'
import { getScopedI18n } from "@/locales/server";

export async function Footer2(){

    const t = await getScopedI18n('footer')
    const u = await getScopedI18n('nav2')

    return(
        <div className="bg-[#f87c1c] text-green-1400 py-9 md:py-[4.5rem] px-5 md:px-14">
            <div className="flex flex-col items-center md:items-stretch text-center gap-y-7 md:gap-y-14">
                <div className="flex flex-col md:flex-row justify-between gap-y-7">
                    <Link href="/">
                        <Image src={RecicletoolLogo} alt="Recicletool Logo" className="w-full h-full"/>
                    </Link>
                    <div className="flex gap-7">
                        <Link href={`/${u('terms')}`}>
                            <p>{t('terms')}</p>
                        </Link>
                        <Link href={`/${u('regulations')}`}>
                            <p>{t('regulation')}</p>
                        </Link>
                        <Link href={`/${u('about')}`}>
                            <p>{t('who')}</p>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row gap-x-10 justify-between border-t border-white pt-7">
                    <p className="text-left">{t('copyright')}</p>
                    <Link href="https://www.linkedin.com/company/recicletool/" target="_blank">
                        <Image src={Linkedin} alt="Linkedin"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

