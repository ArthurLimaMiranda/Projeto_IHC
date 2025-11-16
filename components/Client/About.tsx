import { CTA } from "@/components/Client/CTA";
import { Footer } from "@/components/Client/Footer";
import { Header } from "@/components/Client/Header";
import Image from "next/image";
import Link from "next/link";
import { getScopedI18n } from "@/locales/server";
import img01 from '../public/assets/ImageSacola.png'
import img02 from '../public/assets/Garrafas.png'
import img03 from '../public/assets/HisTt.png'
import folhaDeSp from '../public/assets/FolhaDeSp.png'
import globoplay from '../public/assets/Globoplay.png'
import draft from '../public/assets/Draft.png'
import ne10 from '../public/assets/Ne10.png'
import { CarrosselContinuo, CarrosselSelection } from "@/components/Client/Carrossel";

async function About() {

  const t = await getScopedI18n('about')
  const u = await getScopedI18n('home')
  const v = await getScopedI18n('btn')
  const x = await getScopedI18n('nav')
  const ab = await getScopedI18n('nav2')

  const carrosselSelecTitles = [t('top.slider.0.title')]
  const carrosselSelecTexts = [t('top.slider.0.text')]

  return (
      <>
        <Header url={1} logo={0} textColor={1} mix={true} bgcolor="" home={x('home')} about={x('about')} contact={x('contact')} projects={x('projects')} solutions={x('solutions')} quote={v('quote')} aboutUrl={ab('about')} contactUrl={ab('contact')} solutionsUrl={ab('solutions')}/>
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-[50%] px-10 lg:px-12 flex flex-col gap-y-10 mt-16 lg:mt-0 py-10 lg:py-0 lg:gap-y-5 items-center lg:items-start justify-center text-center lg:text-left">
              <p className="text-3xl lg:text-4xl">{t('top.heading')}</p>
              <p className="text-lg lg:text-base">{t('top.text')}</p>
              <Link className="bg-green-1300 text-green-1400 hover:bg-green-50 rounded-full text-center w-[10rem] px-6 py-1.5" href="/contact">
                  {u('solutions.machines.standardCta')}
              </Link>
            </div>
            <div className="lg:w-[50%] flex flex-col">
              <CarrosselSelection titleArr={carrosselSelecTitles} textArr={carrosselSelecTexts}/>
            </div>     
        </div>

        <div className="flex flex-col w-full left-0">
          
          <div className="flex flex-col px-10 lg:px-16 items-center gap-y-10 py-[4.5rem] lg:py-[7.5rem] border-t border-t-green-1300">
            <div className="flex flex-col gap-y-7 lg:flex-row gap-x-14 items-center">
              <div className="flex flex-col w-full justify-center gap-y-2">
                <p className="text-left text-lg lg:text-base font-bold text-green-1400">{t('story.tag')}</p>
                <p className="border-l border-l-green-1300 pl-5 lg:pl-8 text-left text-green-1400 font-normal text-4xl lg:text-[3rem] lg:leading-[3rem]">{t('story.heading')}</p>
              </div>
              <p className="w-full text-justify lg:text-left text-lg lg:text-base">{t('story.text')}</p>
            </div>
            
            <div className="w-full h-[20rem] md:h-[55rem] overflow-hidden relative rounded-[1.9rem]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={img03} alt="Imagem máquina Recicletool" layout="fill" objectFit="cover" objectPosition="center 30%"/>
              </div>
            </div>

            <p className="font-normal text-green-1400 text-2xl text-center lg:text-3xl">{t('story.footer')}</p>
          </div>
          
          <CarrosselContinuo/>
          <div className="flex flex-col gap-y-14 lg:gap-y-28 py-14 lg:py-28">
            <div className="px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
              <p className="text-center text-xl lg:text-base lg:text-left font-medium">{t('newsText')}</p>
              <Image src={folhaDeSp} alt="Folha de São Paulo Logo"/>
              <Image src={globoplay} alt="GloboPlay Logo"/>
              <Image src={draft} alt="Draft Logo"/>
              <Image src={ne10} alt="Ne10 Logo"/>
            </div>

            <div className="flex flex-col lg:flex-row w-full bg-gray-1100 text-gray-500 py-14 lg:py-[7rem] px-10 lg:px-16 items-center gap-x-20 gap-y-14">
              <Image src={img01} alt="Sacolas para reciclagem"/>
              <div className="flex flex-col justify-center gap-y-14 lg:gap-y-7">
                <div className="gap-y-10 lg:gap-y-5 flex flex-col">
                  <p className="text-3xl font-semibold lg:text-6xl text-left text-gray-500">{t('impact.heading')}</p>
                  <p className="font-medium text-xl text-justify text-gray-500">{t('impact.text')}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-12 gap-y-14">
                  <div>
                    <p className="font-bold text-5xl text-green-1400">{t('impact.dataColect')}</p>
                    <p className="text-justify text-gray-500">{t('impact.textColect')}</p>
                  </div>
                  <div>
                    <p className="font-bold text-5xl text-green-1400">70.37%</p>
                    <p className="text-justify text-gray-500">{t('impact.textCuriosity')}</p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-12 gap-y-14">
                  <div>
                    <p className="font-bold text-5xl text-green-1400">20%</p>
                    <p className="text-justify text-gray-500">{t('impact.textOrders')}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-5xl text-green-1400">{t('impact.dataArcomix')}</p>
                      <Image src={img02} alt="Garrafas pet"/>
                    </div>
                    <p className="text-justify text-gray-500">{t('impact.textArcomix')}</p>
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

export default About
