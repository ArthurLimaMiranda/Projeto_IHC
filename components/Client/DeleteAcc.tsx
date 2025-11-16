import { Footer } from "@/components/Client/Footer";
import { Header } from "@/components/Client/Header";
import Image from "next/image";
import { getScopedI18n } from "@/locales/server";
import emailIcon from '../public/assets/Email.svg'
import reuniaoIcon from '../public/assets/Reuniao.svg'
import faleConoscoIcon from '../public/assets/FaleConoso.svg'
import whatsappIcon from '../public/assets/whatsapp.svg'
import foto_03 from '../public/assets/foto_03.png'
import { MarcasBranco } from "@/components/Client/Marcas";
import Link from "next/link";
import { CTA } from "./CTA";
import vector from '../public/assets/Vector.svg'
//import { Contact } from "./Contact";

async function DeleteAcc() {

  const u = await getScopedI18n('contact')
  const y = await getScopedI18n('deletAccount')
  const v = await getScopedI18n('btn')
  const x = await getScopedI18n('nav')
  const ab = await getScopedI18n('nav2')


  return (
      <>
        <Header url={9} textColor={0} logo={0} mix={false} bgcolor="bg-gray-1400" home={x('home')} about={x('about')} contact={x('contact')} projects={x('projects')} solutions={x('solutions')} quote={v('quote')} aboutUrl={ab('about')} contactUrl={ab('contact')} solutionsUrl={ab('solutions')}/>
        <div className="flex flex-col w-full left-0">
          <div className="flex flex-col bg-gray-1400 text-gray-500 pb-[6.3rem] px-10 md:px-16 items-center">
            <div className="flex flex-row text-center  items-center w-full px-10 md:px-14 pb-[3rem] pt-40 md:pt-20 gap-x-[4.5rem] justify-center">
                <p className="text-black font-bold md:font-semibold text-4xl text-center md:text-left">{y('top.heading')}</p>      
            </div> 
            <div className="flex flex-col md:flex-row w-full items-center gap-y-12 justify-start gap-x-24">
              <Image src={foto_03} alt="projetos" className="h-80 w-80 md:h-[60%] md:w-[60%]"/>
              <div className="flex flex-col justify-center gap-y-12">

                <div className="flex items-center md:items-start gap-x-5"> 
                  <div className="flex flex-col gap-y-5">
                    <p className="font-bold text-lg">{y('mid.heading')}</p>
                    <ul className="list-disc pl-5">
                      <li>{y('mid.content.0')}</li>
                      <li>{y('mid.content.1')}</li>
                      <li>{y('mid.content.2')}</li>
                      <li>{y('mid.content.3')}</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center md:items-start gap-x-5"> 
                  <div>
                    <p>{y('mid.how')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CTA />
          <Footer />
        </div>
      </>
  )
}

export default DeleteAcc
