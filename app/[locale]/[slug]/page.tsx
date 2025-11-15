import About from "@/components/About"
import ContactMain from "@/components/ContactMain"
import DeleteAcc from "@/components/DeleteAcc"
import Regulations from "@/components/Regulation"
import { Selector } from "@/components/Selector"
import Solutions from "@/components/Solutions"
import Terms from "@/components/Terms"
import { getScopedI18n } from "@/locales/server"



export default async function Home() {
  const u = await getScopedI18n('nav2')
  return(
    <>
    <Selector page={u('about')}>
      <About/>
    </Selector>

    <Selector page={u('solutions')}>
      <Solutions/>
    </Selector>

    <Selector page={u('contact')}>
      <ContactMain/>
    </Selector>

    <Selector page={u('terms')}>
      <Terms/>
    </Selector>

    <Selector page={u('regulations')}>
      <Regulations/>
    </Selector>

    <Selector page={u('deletAcc')}>
      <DeleteAcc/>
    </Selector>
    </>
  )
}