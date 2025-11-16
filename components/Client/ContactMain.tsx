import { Footer } from "@/components/Client/Footer";
import { Header } from "@/components/Client/Header";
import Image from "next/image";
import { getScopedI18n } from "@/locales/server";
import emailIcon from '../public/assets/Email.svg'
import reuniaoIcon from '../public/assets/Reuniao.svg'
import faleConoscoIcon from '../public/assets/FaleConoso.svg'
import whatsappIcon from '../public/assets/whatsapp.svg'
import img01 from '../public/assets/FaleConosco.png'
import { MarcasBranco } from "@/components/Client/Marcas";
import Link from "next/link";
//import { Contact } from "./Contact";

async function ContactMain() {

  const u = await getScopedI18n('contact')
  const v = await getScopedI18n('btn')
  const x = await getScopedI18n('nav')
  const ab = await getScopedI18n('nav2')


  return (
      <>
        <Header url={4} textColor={0} logo={0} mix={false} bgcolor="bg-gray-1400" home={x('home')} about={x('about')} contact={x('contact')} projects={x('projects')} solutions={x('solutions')} quote={v('quote')} aboutUrl={ab('about')} contactUrl={ab('contact')} solutionsUrl={ab('solutions')}/>
        <div className="flex flex-col w-full left-0">
          <div className="flex flex-col md:flex-row items-center w-full px-10 md:px-14 pb-[6.4rem] pt-20 gap-x-[4.5rem] gap-y-14 justify-start">
            <div className="w-full gap-y-6 flex flex-col justify-start">
              <p className="text-black font-semibold md:font-normal text-5xl md:text-4xl text-center md:text-left">{u('top.heading')}</p>    
              <p className="text-black font-normal text-lg md:text-base text-center md:text-left pr-8">{u('top.text')}</p>    
              {/*<Contact term1={u('top.checkLabel')} term2={u('top.checkTermsLabel')} but={v('send')}/>*/}
            </div>
            <div className="flex justify-end">
              <div className="w-[20rem] h-[20rem] lg:w-[34rem] lg:h-[34rem] overflow-hidden relative rounded-3xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src={img01} alt="Trabalhadores com garrafas coletadas" layout="fill" objectFit="cover" objectPosition="center"/>
                </div>
              </div>
            </div>
          </div>
          <MarcasBranco/>
          <div className="flex flex-col lg:flex-row w-full bg-gray-1100 text-gray-500 gap-y-5 lg:gap-y-[7.4rem] py-20 px-10 lg:px-14 justify-center gap-x-14 items-center  text-center">
                
                <div className="flex flex-col items-center justify-center gap-y-6">
                  <Image src={emailIcon} alt="coca cola Logo"/>
                  <p className="text-green-1400 font-bold text-3xl">Email</p>
                    <p className="hover:border-b-green-50 font-normal text-base hover:text-green-50 text-green-1400 border-b border-b-green-1300">
                    <a href="mailto:td@recicletool.com">td@recicletool.com</a>
                    </p>
                  <br />
                </div>

                <div className="flex flex-col items-center justify-center gap-y-6">
                  <Image src={reuniaoIcon} alt="coca cola Logo"/>
                  <p className="text-green-1400 font-bold text-3xl">{u('icons.meet')}</p>
                  <Link href="/contact">
                    <p className="hover:border-b-green-50 font-normal text-base hover:text-green-50 text-green-1400 border-b border-b-green-1300">{v('toSchedule')}</p>
                  </Link>
                  <br />
                </div>

                <div className="flex flex-col items-center justify-center gap-y-6">
                  <Image src={faleConoscoIcon} alt="coca cola Logo"/>
                  <p className="text-green-1400 font-bold text-3xl">{u('icons.talkToUs')}</p>
                  <div className="gap-y-2 flex flex-col items-center">

                    <p className="hover:border-b-green-50 font-normal text-base hover:text-green-50 text-green-1400 border-b border-b-green-1300">
                      <a href="tel:+37253650493">{"+372 5365-0493"}</a>
                    </p>

                  </div>
                </div>
          </div>
          <div className="py-14 md:py-[7rem] px-10 md:px-14 gap-y-10 md:gap-y-20 flex flex-col items-center md:items-start text-center md:text-left"> 
                  <p className="text-5xl font-normal">{u('faq.heading')}</p>
                  <div className="gap-y-8 flex flex-col">
                    <div className="flex flex-col md:flex-row py-6 gap-y-5 justify-between border-t border-t-green-1300 w-full">
                      <p className="md:w-[30%] font-medium text-xl">{u('faq.question1')}</p>
                      <p className="md:w-[50%]">{u('faq.answer1')}</p>
                    </div>
                    <div className="flex flex-col md:flex-row py-6 gap-y-5 justify-between border-t border-t-green-1300 w-full">
                      <p className="md:w-[30%] font-medium text-xl">{u('faq.question2')}</p>
                      <p className="md:w-[50%]">{u('faq.answer2')}</p>
                    </div>
                    <div className="flex flex-col md:flex-row py-6 gap-y-5 justify-between border-t border-t-green-1300 w-full">
                      <p className="md:w-[30%] font-medium text-xl">{u('faq.question3')}</p>
                      <p className="md:w-[50%]">{u('faq.answer3').split('.').map((sentence, index) => (<p key={index}>{sentence.trim()}.</p>))}</p>
                    </div>
                    <div className="flex flex-col md:flex-row py-6 gap-y-5 justify-between border-t border-t-green-1300 w-full">
                      <p className="md:w-[30%] font-medium text-xl">{u('faq.question4')}</p>
                      <p className="md:w-[50%]">{u('faq.answer4')} <Link href={`${ab('deletAcc')}`} className=" underline text-blue-700 hover:text-blue-300"><span>{u('faq.answer42')}</span></Link></p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-y-6 gap-x-6">
                    <p className="text-3xl font-normal">{u('faq.ctaLabel')}</p>
                    <Link href="/contact">
                      <p className="bg-green-1300 text-green-1400 hover:bg-green-50 rounded-full px-6 py-1.5">{v('sendQuestion')}</p>
                    </Link>
                  </div>
          </div>
          <Footer />
        </div>
      </>
  )
}

export default ContactMain
