import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getScopedI18n } from "@/locales/server";

async function Terms() {
  const v = await getScopedI18n('btn')
  const x = await getScopedI18n('nav')
  const ab = await getScopedI18n('nav2')

  return (
      <>
        <Header url={9} textColor={0} logo={0} mix={false} bgcolor="bg-gray-1400" home={x('home')} about={x('about')} contact={x('contact')} projects={x('projects')} solutions={x('solutions')} quote={v('quote')} aboutUrl={ab('about')} contactUrl={ab('contact')} solutionsUrl={ab('solutions')}/>
        <div className="flex flex-col w-full left-0">
          <div>
            <div className="w-full text-center">
              <p className="py-2 text-xl font-bold text-black">Termos de Serviço</p>
            </div>

            <div className="flex flex-col text-left items-start gap-y-4 w-full h-full border-t border-t-black py-9 px-12 bg-gray-1100">

              <p>A seguir estão descritas as regras aplicáveis à utilização do aplicativo “Recicletool” (“Aplicativo”) disponibilizado pela RECICLETOOL INDÚSTRIA DE MÁQUINAS DE RECICLAGEM DE PERNAMBUCO, sociedade empresária limitada, com sede na cidade de Recife, Pernambuco, na Avenida Professor Luiz Freire, no 700, Curado, CEP 50.740-540, inscrita no CNPJ/MF sob o no 11.832.278/0001-41, doravante identificada como (“Recicletool Reciclagem”), em dispositivos móveis com sistemas Android, iOs e Windows Phone.</p>

              <p>Ao realizar o cadastro para utilização do Aplicativo, o Usuário se submeterá automaticamente às regras e condições destes Termos de Uso e do REGULAMENTO, TERMOS DE USO E ADESÃO AO PROGRAMA RECICLETOOL, ambos disponibilizados no endereço www.recicletool.eco.br.</p>

              <p>O Aplicativo permite que o Usuário tenha acesso a informações e conteúdos relacionados à Recicletool Reciclagem e a sua conta individual vinculada a Empresa e regida através do REGULAMENTO, TERMOS DE USO E ADESÃO AO PROGRAMA RECICLETOOL. Informações tais como a lista de parceiros para trocas de créditos de reciclagem, saldo e extrato de créditos de reciclagem e locais de instalação das máquinas Recicletool estão disponíveis para consulta do Usuário através do aplicativo.</p>

              <p>O cadastro para uso do Aplicativo é realizado no primeiro acesso do Usuário que deverá preencher os dados solicitados no ato para ter acesso às funcionalidades do aplicativo e ao Programa Recicletool de Reciclagem.</p>

              <p>Será permitido um único cadastramento por Usuário, devendo o acesso, visualização e uso do Aplicativo ser feito pelo Usuário em caráter pessoal e intransferível. Não é permitido compartilhamento do Aplicativo em qualquer site ou ambiente virtual, que não nas plataformas de download determinadas pela Recicletool Reciclagem e por ela divulgada em seus canais de interação com os Usuários, a saber-se: www.recicletool.eco.br e/ou www.facebook.com/recicletool.</p>

              <p>Não será permitida a instalação do aplicativo para Usuários no caso de menores de 18 anos e incapazes perante a Lei, ainda que sejam representadas na forma da lei, por pais ou representantes legais.</p>

              <p>É proibida a realização de mais de um cadastro por Usuário, bem como, o Usuário se utilizar do cadastro de outro Usuário para operar o aplicativo em questão.</p>

              <p>A Recicletool Reciclagem poderá, sem prévio aviso, bloquear e cancelar o acesso ao aplicativo quando verificar que o Usuário praticou algum ato ou mantenha conduta que (i) viole as leis e regulamentos federais, estaduais e/ou municipais, (ii) contrarie as regras destes Termos de Uso, ou (iii) viole os princípios da moral e dos bons costumes ou (iv) se utilize da ferramenta em desfavor da Recicletool Reciclagem, denegrindo ou prejudicando a imagem da empresa perante o público ou o mercado.</p>

              <p>Toda e qualquer ação executada ou conteúdo publicado pelo Usuário durante o uso do aplicativo, fazendo menção da Empresa ou de seus produtos, será de sua exclusiva e integral responsabilidade, devendo isentar e indenizar a Recicletool Reciclagem de quaisquer reclamações, prejuízos, perdas e danos causados à Recicletool Reciclagem, em decorrência de tais ações ou manifestações.</p>

              <p>O Usuário autoriza a Recicletool Reciclagem ou terceiros por ela indicados, a utilizar, por prazo indeterminado, as informações fornecidas no ato de instalação, do cadastro e durante o uso do aplicativo, para fins estatísticos, de criação de banco de dados de perfil de pós-consumo, envio de material publicitário, entre outros.</p>

              <p>Outras autorizações de acesso a informações do Usuário podem ser solicitadas no ato da instalação do aplicativo. O Usuário observá-las e concordar com elas para utilizar o aplicativo.</p>

              <p>A Recicletool Reciclagem se reserva o direito de incluir, excluir ou alterar os conteúdos e funcionalidades do aplicativo, bem como suspendê-lo temporariamente ou cancelá-lo, a qualquer momento, independentemente de aviso-prévio ao Usuário. Da mesma forma, poderá modificar estes Termos de Uso, cuja versão mais recente estará sempre disponível para consulta no próprio aplicativo e no endereço www.recicletool.eco.br.</p>

              <p>RECICLETOOL RECICLAGEM SE EXIME DE TODA E QUALQUER RESPONSABILIDADE PELOS DANOS E PREJUÍZOS DE QUALQUER NATUREZA QUE POSSAM DECORRER DO ACESSO, INTERCEPTAÇÃO, ELIMINAÇÃO, ALTERAÇÃO, MODIFICAÇÃO OU MANIPULAÇÃO, POR TERCEIROS NÃO AUTORIZADOS, DOS DADOS DO USUÁRIO DURANTE A UTILIZAÇÃO DO APLICATIVO.</p>

              <p>As informações solicitadas ao Usuário no momento do cadastro serão utilizadas pela Recicletool Reciclagem somente para os fins previstos nestes Termos de Uso e em nenhuma circunstância, tais informações serão cedidas ou compartilhadas com terceiros, exceto por ordem judicial ou de autoridade competente.</p>

              <p>Fica eleito o Foro da Comarca da cidade de Recife, Estado de Pernambuco, para dirimir quaisquer questões decorrentes destes Termos de Uso, que será regido pelas leis brasileiras.</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
  )
}

export default Terms
