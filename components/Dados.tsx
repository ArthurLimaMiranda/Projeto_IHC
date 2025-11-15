import { getScopedI18n } from "@/locales/server";
import { Banner } from "./Banner";

export async function Dados(){

    const t = await getScopedI18n('home.data')
    const u = await getScopedI18n('home.banner')
    const secondLine = [u('titleSecondLine.0'), u('titleSecondLine.1'), u('titleSecondLine.2')]

    return(
      <div className="flex flex-col bg-gray-1400 text-gray-500 gap-y-10 md:gap-y-[5.8rem] py-20 px-5 md:px-20 items-center border-b border-b-green-1300 border-t-gray-1400">
        
        <Banner titleFirstLine={u('titleFirstLine')} titleSecondLine={secondLine}/>
        
        <ul className="px-10 flex flex-col md:flex-row w-full justify-between text-xl text-center md:text-left md:text-3xl font-medium gap-y-5 gap-x-28 md:px-0 list-disc md:list-none">
          <li>{t('columnLeft')}</li>
          <li>{t('columnCenter')}</li>
          <li>{t('columnRight')}</li>
        </ul>

        <div className="px-5 w-full text-center md:text-left">
            <p>{t('footer')}</p>
        </div>
      </div>
    )
}

