import { CTA } from "@/components/Client/CTA";
import { Footer } from "@/components/Client/Footer";
import { Header } from "@/components/Client/Header";

import Image from "next/image";
import { getScopedI18n } from "@/locales/server";
import { Produtos } from "@/components/Client/Produtos";
import img01 from '../public/assets/Reciclando.png'
import selo1 from '../public/assets/Selo1.png'
import selo2 from '../public/assets/Selo2.png'
import gal1 from '../public/assets/Galeria1.png'
import gal2 from '../public/assets/Galeria2.png'
import gal3 from '../public/assets/Galeria3.png'
import gal4 from '../public/assets/Galeria4.png'

import passo1Hover from '../public/assets/passo1Hover.png'
import passo2Hover from '../public/assets/passo2Hover.png'
import passo3Hover from '../public/assets/passo3Hover.png'
import passo4Hover from '../public/assets/passo4Hover.png'


import AutoPlayVideo from "@/components/Client/AutoPlayVideo";
import { MaquinSolucoesBut } from "@/components/Client/MaquinasBut";
import Link from "next/link";

async function Solutions() {


  const t = await getScopedI18n('machines')
  const u = await getScopedI18n('btn')
  const v = await getScopedI18n('products')
  const w = await getScopedI18n('infoMachine')
  const x = await getScopedI18n('home')
  const y = await getScopedI18n('machines')
  const z = await getScopedI18n('nav')
  const ab = await getScopedI18n('nav2')

  const bundleMaquina = 
  [{
    title:"Standard", 
    description:x('solutions.machines.standardText'), 
    dimensao:w('standardAndMax.specification.dimensions'), 
    list:[w('standardAndMax.specification.list.0'), 
          w('standardAndMax.specification.list.1'), 
          w('standardAndMax.specification.list.2'), 
          w('standardAndMax.specification.list.3'), 
          w('standardAndMax.specification.list.4'),
          w('standardAndMax.specification.list.5'),
          w('standardAndMax.specification.list.6'),
          w('standardAndMax.specification.list.7'),
          w('standardAndMax.specification.list.8'),
          w('standardAndMax.specification.list.9')],
          
    capacidade:w('standardAndMax.capacity')
  },
  {
    title:"Max", 
    description:x('solutions.machines.maxText'), 
    dimensao:w('standardAndMax.specification.dimensions'), 
    list:[w('standardAndMax.specification.list.0'), 
          w('standardAndMax.specification.list.1'), 
          w('standardAndMax.specification.list.2'), 
          w('standardAndMax.specification.list.3'), 
          w('standardAndMax.specification.list.4'),
          w('standardAndMax.specification.list.5'),
          w('standardAndMax.specification.list.6'),
          w('standardAndMax.specification.list.7'),
          w('standardAndMax.specification.list.8'),
          w('standardAndMax.specification.list.9')],
          
    capacidade:w('standardAndMax.capacity')
  },
  {
    title:"Plus", 
    description:x('solutions.machines.plusText'), 
    dimensao:w('plus.specification.dimensions'), 
    list:[w('plus.specification.list.0'), w('plus.specification.list.1'), w('plus.specification.list.2'), w('plus.specification.list.3'), w('plus.specification.list.4')],
    capacidade:w('plus.capacity')
  },
  {
    title:x('solutions.machines.otherTitle'), 
    description:x('solutions.machines.otherText'), 
    dimensao:w('other.specification.dimensions'), 
    list:[w('other.specification.list.0'), 
          w('other.specification.list.1'), 
          w('other.specification.list.2'), 
          w('other.specification.list.3'), 
          w('other.specification.list.4'),
          w('other.specification.list.5')],
          
    capacidade:w('other.capacity')
  }]

  return (
      <>
        <Header url={2} textColor={1} logo={1} mix={false} bgcolor="bg-green-1400" home={z('home')} about={z('about')} contact={z('contact')} projects={z('projects')} solutions={z('solutions')} quote={u('quote')} aboutUrl={ab('about')} contactUrl={ab('contact')} solutionsUrl={ab('solutions')}/>
        <div className="flex flex-col bg-green-1400 items-center px-3 lg:px-20">
          <div className="w-full h-[10rem] md:h-[20rem] lg:h-[30rem] relative rounded-[1.9rem] mt-20 lg:mt-0">
              <div className="absolute inset-0 items-center justify-center">
                <Image src={img01} alt="Pessoa utilizando a máquina da Recicletool" layout="fill" objectFit="contain" className="hidden lg:flex"/>
                <Image src={img01} alt="Pessoa utilizando a máquina da Recicletool" layout="fill" objectFit="cover" className="lg:hidden rounded-[1.9rem]"/>
              </div>
          </div>
          <div className="flex flex-col lg:flex-row pb-14 lg:pb-[6rem] lg:px-0 pt-[2rem] items-center gap-x-10 gap-y-10 text-white">
            <p className="text-2xl lg:text-3xl text-center lg:text-left font-semibold lg:font-normal">{t('top.heading')}</p>
            <p className="text-lg lg:text-base text-center lg:text-justify">{t('top.text')}</p>
          </div>
        </div>
        <div className="flex flex-col w-full left-0">
          <div className="flex flex-col lg:flex-row py-20">
            <div className="px-10 lg:px-14 gap-y-8 flex flex-col w-full lg:w-[40%] lg:pb-0 pb-10 md:pb-20">
              <p className="text-3xl text-center lg:text-left lg:text-5xl font-normal">{t('tutorial.headerTitle')}</p>
              <p className="text-base text-center lg:text-left font-normal">{t('tutorial.headerText')}</p>
            </div>
            <div className="flex flex-col overflow-y-scroll h-[400px] md:h-[700px] lg:h-[800px] lg:w-[60%]">

              <div className="flex flex-col group relative border border-1 border-green-1300 bg-slate-200 lg:bg-transparent">
                <div className="w-full object-cover rounded-lg transition-opacity group-hover:opacity-0 flex md:flex-row justify-end">
                  <Image src={passo1Hover} alt="Passo 1" className="opacity-0"/>
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%] justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-bold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end">{t('tutorial.step1Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[50%] md:pl-0">{t('tutorial.step1Text')}</p>
                  </div>
                </div>
                <div className="w-full object-cover rounded-lg absolute top-0 left-0 opacity-0 flex flex-row justify-end group-hover:opacity-100 transition-opacity">
                  <Image src={passo1Hover} alt="Passo 1" />
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%] justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-bold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end">{t('tutorial.step1Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[50%] md:pl-0">{t('tutorial.step1Text')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group relative border border-1 border-green-1300 bg-slate-200 lg:bg-transparent">
                <div className="w-full object-cover rounded-lg transition-opacity group-hover:opacity-0 flex flex-row justify-end">
                  <Image src={passo2Hover} alt="Passo 2" className="opacity-0"/>
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%]justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-bold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end">{t('tutorial.step2Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[50%] md:pl-0">{t('tutorial.step2Text')}</p>
                  </div>
                </div>
                <div className="w-full object-cover rounded-lg absolute top-0 left-0 opacity-0 flex flex-row justify-end group-hover:opacity-100 transition-opacity">
                  <Image src={passo2Hover} alt="Passo 2" />
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%] justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-bold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end text-white">{t('tutorial.step2Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[50%] md:pl-0 text-white">{t('tutorial.step2Text')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group relative border border-1 border-green-1300 bg-slate-200 lg:bg-transparent">
                <div className="w-full object-cover rounded-lg transition-opacity group-hover:opacity-0 flex flex-row justify-end">
                  <Image src={passo3Hover} alt="Passo 3" className="opacity-0"/>
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%] justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-bold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end">{t('tutorial.step3Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[50%] md:pl-0">{t('tutorial.step3Text')}</p>
                  </div>
                </div>
                <div className="w-full object-cover rounded-lg absolute top-0 left-0 opacity-0 flex flex-row justify-end group-hover:opacity-100 transition-opacity">
                  <Image src={passo3Hover} alt="Passo 3" />
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%] justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-bold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end">{t('tutorial.step3Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[50%] md:pl-0">{t('tutorial.step3Text')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col group relative border border-1 border-green-1300 bg-slate-200 lg:bg-transparent">
                <div className="w-full object-cover rounded-lg transition-opacity group-hover:opacity-0 flex flex-row justify-end">
                  <Image src={passo4Hover} alt="Passo 4" className="opacity-0"/>
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%] justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-semibold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end">{t('tutorial.step4Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[40%] md:pl-0">{t('tutorial.step4Text')}</p>
                  </div>
                </div>
                <div className="w-full object-cover rounded-lg absolute top-0 left-0 opacity-0 flex flex-row justify-end group-hover:opacity-100 transition-opacity">
                  <Image src={passo4Hover} alt="Passo 4" />
                  <div className="w-full md:w-[50%] z-30 h-full absolute top-0 gap-y-[15%] md:gap-y-[25%] lg:gap-y-[35%] justify-center flex flex-col px-4 md:py-8 md:px-14 text-center">
                    <p className="font-bold text-xl md:font-normal md:text-5xl md:leading-10 flex flex-row justify-end">{t('tutorial.step4Title')}</p>
                    <p className="font-semibold md:font-normal text-right md:text-center text-xs md:text-xl lg:text-base pl-[40%] md:pl-0">{t('tutorial.step4Text')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <AutoPlayVideo 
            src={'/assets/videoProp.mp4'}
            loop
          />

          <div className="gap-y-[4.5rem] flex flex-col py-14 md:py-[7rem] bg-white">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-y-10 justify-between px-14">
              <div className="flex flex-col gap-y-10 md:gap-y-0">
                <p className="font-semibold text-lg md:font-normal md:text-base text-black">{y('machinesSubHeading')}</p>
                <p className="font-normal text-5xl text-center md:text-left text-black">{y('machinesHeading')}</p>
              </div>

              <div className="flex bg-green-1300 hover:bg-green-50 rounded-full text-center items-center px-9 h-10">
                <Link href="/contact">
                  <p>{u('quote')}</p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-x-7 gap-y-10 px-10 md:px-14">
              <MaquinSolucoesBut 
                isSelected
                maquina={1}
                saibaMais={u('toKnow')+' ->'}
                maquinaInfoBundle={bundleMaquina[0]} 
                software={w('softwareText')}/>
                
              <MaquinSolucoesBut 
                isSelected
                maquina={2}
                saibaMais={u('toKnow')+' ->'}
                maquinaInfoBundle={bundleMaquina[1]} 
                software={w('softwareText')}/>

              <MaquinSolucoesBut 
                isSelected
                maquina={3}
                saibaMais={u('toKnow')+' ->'}
                maquinaInfoBundle={bundleMaquina[2]} 
                software={w('softwareText')}/>

              <MaquinSolucoesBut 
                isSelected
                maquina={4}
                saibaMais={u('toKnow')+' ->'}
                maquinaInfoBundle={bundleMaquina[3]} 
                software={w('softwareText')}/>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center lg:gap-x-7 gap-x-[4%] w-[90%] ml-[5%] lg:ml-0 lg:w-full gap-y-10 py-16 lg:py-[6.2rem] items-center bg-gray-1400">
            <div className="flex flex-col gap-y-7">
              <Image src={gal1} alt="Maquina na frente de loja" className="rounded-xl"/>
              <Image src={gal2} alt="Maquina cocacola" className="rounded-xl"/>
            </div>
            <div className="flex flex-col gap-y-7">
              <Image src={gal3} alt="Pessoas coletando garrada de vidro" className="rounded-xl"/>
              <Image src={gal4} alt="Maquina em exibição" className="rounded-xl"/>
            </div>
          </div>

          <div className="py-16 md:py-[6.2rem] bg-white gap-x-[4%] px-[5%] w-full gap-y-10 flex flex-col md:flex-row items-center justify-center">
            <Image src={selo1} alt="Startup Destaque Liga Insights AutoTech"/>
            <Image src={selo2} alt="Startup Destaque Liga Insights AutoTech"/>
          </div>

          <div className="flex flex-col w-full bg-gray-1100 text-gray-500 gap-y-14 md:gap-y-[5.8rem] py-20 px-10 md:px-20 items-center">
            <p className="text-4xl md:text-3xl font-semibold md:font-normal text-center">{t('dataHeading')}</p>
            <div className="flex flex-col md:flex-row w-full justify-center gap-y-16 gap-x-16 items-center text-center">
              <div className="flex flex-col gap-y-6">
                <p className="text-green-1400 font-bold text-4xl md:text-3xl">Recife</p>
                <p className="font-normal text-xl md:text-base">Pernambuco</p>
              </div>
              <div className="flex flex-col gap-y-6">
                <p className="text-green-1400 font-bold text-4xl md:text-3xl">São Paulo</p>
                <p className="font-normal text-xl md:text-base">São Paulo</p>
              </div>
              <div className="flex flex-col gap-y-6">
                <p className="text-green-1400 font-bold text-4xl md:text-3xl">Fortaleza</p>
                <p className="font-normal text-xl md:text-base">Ceará</p>
              </div>
            </div>
          </div>

          <Produtos title={v('title')} cokeTitle={v('cokeTitle')} cokeText={v('cokeText')} heinekenTitle={v('heinekenTitle')} heinekenText={v('heinekenText')} saibaMais={u('clickAndKnow')}/>
          <CTA />
          <Footer />
        </div>
      </>
  )
}

export default Solutions
