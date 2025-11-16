import { Footer } from "@/components/Client/Footer";
import { Header } from "@/components/Client/Header";
import { getScopedI18n } from "@/locales/server";

async function Regulations() {
  const v = await getScopedI18n('btn')
  const x = await getScopedI18n('nav')
  const ab = await getScopedI18n('nav2')
  return (
      <>
        <Header url={9} textColor={0} logo={0} mix={false} bgcolor="bg-gray-1400" home={x('home')} about={x('about')} contact={x('contact')} projects={x('projects')} solutions={x('solutions')} quote={v('quote')} aboutUrl={ab('about')} contactUrl={ab('contact')} solutionsUrl={ab('solutions')}/>
        <div className="flex flex-col w-full left-0">
          <div>
            <div className="w-full text-center">
              <p className="py-2 text-xl font-bold text-black">Regulamentos</p>
            </div>

            <div className="flex flex-col text-left items-start gap-y-4 w-full h-full border-t border-t-black py-9 px-12 bg-gray-1100">
              <p>A RECICLETOOL INDÚSTRIA DE MÁQUINAS DE RECICLAGEM DE PERNAMBUCO, sociedade empresária limitada, com sede na cidade de Recife, Pernambuco, na Avenida Professor Luiz Freire, nº 700, Curado, CEP 50.740540, inscrita no CNPJ/MF sob o nº 11.832.278/0001-41, doravante reconhecida como “RECICLETOOL RECICLAGEM”, é a empresa responsável pela operação comercial da Máquina Automatizada de Captação de Resíduos Sólidos Recicláveis “RECICLETOOL” e seus respectivos serviços e benefícios.</p>

              <p>A RECICLETOOL Utilizando tecnologia de leitura ótica, a máquina realiza a identificação dos resíduos que são depositados na máquina pelos clientes, fazendo o cadastro dos mesmos para crédito financeiro ou não da reciclagem. Funciona assim:</p>

              <p>1 - Primeiro a pessoa se cadastra utilizando o número do celular, na própria máquina, que estará disponível em shoppings e supermercados. A máquina, que é conectada com a internet, guardará aquelas informações do cliente, para que depois, pelo site ou smartphone, o cliente possa concluir o cadastro com os dados restantes: nome, sexo, idade, endereço e conta para depósito dos seus créditos.</p>

              <p>2 - Depois do pré-cadastro, a pessoa pode automaticamente começar a reciclar. Os resíduos depositados na máquina são identificados e mostrados na tela touchscreen, informando quanto o cliente está ganhando por cada resíduo depositado na máquina.</p>

              <p>3 - Ao terminar de reciclar, o cliente finaliza a ação na tela e verá o total ganho com aquela reciclagem.</p>

              <p>4 - Para acompanhar a evolução de sua conta e o seu saldo de reciclagem é necessário completar o cadastro no site ou smartphone, com o aplicativo da máquina.</p>

              <p>O presente REGULAMENTO, TERMOS DE USO E ADESÃO AO PROGRAMA RECICLETOOL tem o objetivo de definir todas as regras, termos e condições para participação dos “Clientes Recicladores” no processo de reciclagem e crédito através da RECICLETOOL. A participação no referido programa pressupõe, obrigatoriamente, a leitura e aceitação plena dos termos, regras e condições estabelecidas neste documento.</p>

              <p>A não aceitação dos termos, regras e condições aqui estabelecidas implica na impossibilidade de participação do “Cliente Reciclador”, no Programa Recicletool.</p>

              <p><strong>1 - ADESÃO DOS CLIENTES RECICLADORES NO PROGRAMA RECICLETOOL E MANUTENÇÃO DOS CRÉDITOS FINANCEIROS</strong></p>

              <p><strong>1.1 – Aceitação:</strong> a participação dos Clientes Recicladores no Programa Recicletool se dará apenas com a aceitação completa dos termos, condições e regras estabelecidas neste documento, devendo o mesmo concordar explicitamente com este instrumento. Podem participar do Programa Recicletool, após aceite destes termos, regras e condições:</p>

              <p>{"a) Toda pessoa física plenamente capaz, conforme o código civil brasileiro, maior de 18 anos, cadastrado através do sítio www.recicletool.eco.br ou do aplicativo da Recicletool, denominado “Recicletool” ou em qualquer outro canal que venha a ser disponibilizado futuramente pela RECICLETOOL RECICLAGEM, para atendimento do respectivo programa."}</p>

              <p><strong>1.1.1 –</strong> A discordância ou o não aceite das regras dispostas neste instrumento, em parte ou completamente, impossibilita a participação de qualquer interessado no Programa Recicletool.</p>

              <p><strong>1.2 - Cadastro:</strong> Para caracterizar o conhecimento, leitura, plena concordância e adesão a este REGULAMENTO, TERMOS DE USO E ADESÃO AO PROGRAMA RECICLETOOL, o Cliente Reciclador deverá cadastrar-se, informando, obrigatoriamente:</p>

              <p><strong>1.2.1 -</strong> Número de celular, senha de acesso, nome completo, CPF, CEP, data de nascimento, sexo, correio eletrônico e conta bancária para depósito dos créditos oriundos da reciclagem realizada através do Programa Recicletool.</p>

              <p><strong>1.2.2 –</strong> A veracidade das informações prestadas pelos Clientes Recicladores é de inteira responsabilidade dos mesmos, que devem manter seus dados cadastrais constantemente atualizados, sob pena de impossibilitar o repasse dos créditos oriundos da reciclagem realizada através do Programa Recicletool. A RECICLETOOL RECICLAGEM não se responsabiliza por dados cadastrais preenchidos de maneira incorreta ou por dados inverídicos informados no ato do cadastramento ou atualização de dados.</p>

              <p><strong>1.2.3 –</strong> Eventualmente, parceiros comerciais da RECICLETOOL RECICLAGEM, poderão realizar, nos bancos de dados da empresa, pré-cadastros de Clientes Recicladores. Nestas ocasiões os Clientes Recicladores deverão complementar o cadastramento através dos canais de cadastro disponibilizados pela empresa, afim de que seja aceito este instrumento e que se complemente as informações necessárias para o cadastro.</p>

              <p><strong>1.3 - Conta Recicletool:</strong> Uma vez realizado o cadastro, será disponibilizada para o Cliente Reciclador uma Conta de Reciclagem, acessível através do aplicativo Recicletool para smartphone, na qual se reunirá todas as informações sobre os créditos auferidos através do depósito de resíduos sólidos nas máquinas Recicletool.</p>

              <p><strong>1.3.1 –</strong> O Cliente Reciclador poderá ter apenas 01 conta ativa junto ao Programa Recicletool. Esta conta será sempre a que tiver o seu cadastro completado primeiro vinculado ao número de telefone informado na primeira reciclagem. Exemplo: Se um cliente entrou com uma reciclagem usando o número hipotético de celular (88) 8888888 e fez 10 reciclagens e depois informou outro número de celular (88) 88888999, e fez nessa segunda vez 3 reciclagens, tendo efetuado o cadastramento usando o segundo número de celular, terá sua conta vinculada ao segundo número de celular, apresentando saldo de 03 reciclagens. A outra conta criada com o celular que não poderá mais ser vinculado ao CPF do Cliente Reciclador, ficará inativa e será encerrada em até 60 dias.</p>

              <p><strong>1.4 –</strong> O acesso ao sistema da Recicletool Reciclagem se dará através do aplicativo de Smartphone Recicletool primordialmente, e eventualmente, através do site www.recicletool.eco.br. A identificação do Cliente Reciclador se dará através de e-mail e senha.</p>

              <p><strong>1.4.1 -</strong> É de total responsabilidade do Cliente Reciclador, acompanhar sua Conta de Reciclagem através do aplicativo Recicletool ou do site www.recicletool.eco.br, quando disponibilizado.</p>

              <p><strong>1.5 -</strong> Informações de uso pessoal do Cliente Reciclador: As informações de acesso à Conta de Reciclagem, tais como identificação de usuário, email ou CPF e a respectiva senha de acesso, são de uso pessoal e intransferível devendo os mesmos mantê-las em estrito sigilo. A não observância desses procedimentos exime a RECICLETOOL RECICLAGEM da responsabilidade por prejuízos em decorrência da utilização indevida desses dados por terceiros.</p>

              <p><strong>1.6 -</strong> Reemissão ou Alteração da Senha de Acesso: A senha de acesso poderá ser reemitida e/ou alterada pelo Participante e seu representante ou assistente, quando for o caso, a qualquer tempo, mediante solicitação dos mesmos através dos serviços de atendimento disponibilizados pela Recicletool Reciclagem no site www.recicletool.eco.br ou no aplicativo para smartphone Recicletool.</p>
              
              <p><strong>2 – CRÉDITOS DE RECICLAGEM E RESGATE</strong></p>

              <p><strong>2.1 –</strong> Os créditos de Reciclagem são as bonificações, financeiras ou não, atribuídas aos Clientes Recicladores pelo Programa Recicletool aos Clientes Recicladores em contrapartida à reciclagem realizada por eles nas máquinas Recicletool.</p>

              <p><strong>2.2 - Propriedade dos Créditos:</strong> Todo e qualquer Créditos de Reciclagem disponível para acúmulo e/ou resgate no Programa Recicletool é de propriedade da própria Recicletool Reciclagem, de modo que qualquer transação realizada com eles deverá respeitar estritamente os termos deste Regulamento.</p>

              <p><strong>2.2.1 –</strong> Os Créditos de Reciclagem acumulados pelos Clientes Recicladores são pessoais e intransferíveis, sendo expressamente vedada a sua cessão a terceiros, a qualquer título, inclusive por sucessão ou herança. No caso de falecimento do Cliente Reciclador, sua Conta de Reciclagem será encerrada e os seus créditos extintos.</p>

              <p><strong>2.3 –</strong> O acúmulo de Créditos de Reciclagem pelo Cliente Reciclador no Programa Recicletool ocorre quando o mesmo depositar resíduos sólidos previamente cadastrados na Recicletool. O depósito de resíduos sólidos não cadastrados ensejará a rejeição do mesmo, havendo ainda a opção de o Cliente Reciclador doar os resíduos, sem, no entanto, receber crédito de reciclagem por esta ação.</p>

              <p><strong>2.3.1 –</strong> Uma vez realizada a Reciclagem e havendo falha na computação dos Créditos de Reciclagem correspondentes, o Cliente reciclador tem o prazo de 7 dias corridos contados a partir da data da realização da reciclagem para efetuar reclamação através do email pontos@recicletool.eco.br. A Recicletool Reciclagem terá o prazo de até 20 corridos para responder à manifestação do Cliente Reciclador informando a resolução do problema.</p>

              <p><strong>2.4 - Validade dos Créditos de Reciclagem:</strong> Os Créditos de Reciclagem tem validade renovável de 60 dias, a contar-se a partir de última movimentação realizada pelo Cliente Reciclador. Compreende-se por movimentação a realização de pelo menos 01 reciclagem em qualquer máquina Recicletool participante do Programa Recicletool, dentro do prazo de 60 dias.</p>

              <p><strong>2.5 –</strong> As contas que não tiverem movimentação no prazo de 60 dias corridos, contados da última reciclagem realizada, terá seu saldo extinto, entendendo-se o período de não-movimentação como declaração de abandono do Programa Recicletool por parte do Cliente Reciclador.</p>

              <p><strong>2.6 -</strong> É proibida a negociação e/ou alienação pelo Cliente Reciclador, dos Créditos de Reciclagem e/ou dos benefícios oferecidos pelo Programa Recicletool, sob qualquer forma.</p>

              <p><strong>2.7 –</strong> O resgate dos créditos de reciclagem com depósito do valor em conta corrente ou poupança informada pelo Cliente Reciclador no ato do cadastramento, apenas poderá ocorrer quando alcançado o valor mínimo de R$ 7,00 (sete reais). O depósito se dará em até 05 dias úteis após a solicitação.</p>

              <p><strong>2.8 –</strong> No caso da conversão dos Créditos de Reciclagem em benefícios para parceiros, será observada a regra estabelecida por cada Parceiro, sendo o Cliente Reciclador informado antes da realização da transação sobre as condições de conversão.</p>

              <p><strong>2.9 –</strong> O Crédito de Reciclagem de que trata o Caput, será estabelecido através da comercialização dos resíduos depositados por cada Cliente Reciclador na Máquina Recicletool, variando de acordo com seu peso, preço no mercado e tipo de resíduo. É parte integrante deste processo a cooperativa de catadores, que é a responsável pela comercialização dos resíduos e posterior depósito em favor da Recicletool Reciclagem, que é a responsável por garantir os resgates dos Créditos de reciclagem para os Clientes Recicladores.</p>

              <p><strong>3 - REGRAS DE ACÚMULO DE CRÉDITOS DE RECICLAGEM</strong></p>

              <p><strong>3.1 –</strong> O acúmulo dos Créditos de Reciclagem se dará até imediatamente após o depósito dos resíduos sólidos válidos (pré-cadastrados) na Recicletool.</p>

              <p><strong>3.2 - Limite de Créditos de Reciclagem:</strong> Não haverá limite diário por pessoa para reciclagem. Entendemos que quanto mais reciclarmos, melhor para todos e para o meio ambiente. No entanto, algumas regras devem ser seguidas:</p>

              <p><strong>3.2.1 -</strong> É obrigação do Cliente Reciclador não amassar ou retirar os rótulos das embalagens colocadas na Recicletool para reciclagem, além de sempre colocar embalagens vazias, sem líquidos, pedras ou resíduos dentro.</p>

              <p><strong>3.2.2 –</strong> O descumprimento do disposto na cláusula 3.2.1 ensejará estorno de Créditos de Reciclagem já creditados em sua Conta Recicletool. Esta ação visa conscientizar a população para a cadeia envolvida no processo de reciclagem, que envolve os catadores que terão contato com os resíduos depositados na máquina. Portanto, quanto mais limpos os resíduos, mais humano é seu tratamento com os profissionais que vão levar à frente a reciclagem. A Higiene faz parte da dignificação do importante trabalho do catador de lixo.</p>

              <p><strong>3.3 - Bonificações Específicas:</strong> Em ocasiões específicas, o programa Recicletool poderá determinar mecanismos de bonificação extra por tipos de resíduos ou resíduos vinculados a marcas específicas, a seu próprio critério. Tais ações serão divulgadas previamente afim de que os Clientes Recicladores possam ter maiores benefícios na reciclagem de seus resíduos sólidos.</p>

              <p><strong>4 - UTILIZAÇÃO E DISPONIBILIZAÇÃO DE INFORMAÇÕES A PARCEIROS</strong></p>

              <p><strong>4.1 –</strong> A Recicletool Reciclagem poderá utilizar as informações fornecidas quando do cadastro do Cliente Reciclador, ou aquelas obtidas a partir de pesquisas realizadas pela empresa junto aos Clientes Recicladores, e coletadas em razão de utilização do Programa Recicletool, de acordo com as seguintes regras:</p>

              <p><strong>a -</strong> As informações de contato fornecidas pelo Cliente Reciclador poderão ser utilizadas para a divulgação de opções de resgate e utilização dos Créditos de Reciclagem acumulados, bem como para o envio de publicidade sobre os serviços da Recicletool Reciclagem, seus Parceiros e Anunciantes.</p>

              <p><strong>b -</strong> Poderão ser compartilhadas as informações coletadas pela Recicletool Reciclagem com seus Parceiros e Clientes Recicladores, para fins de identificação de responsáveis pela acumulação ou utilização indevida dos Créditos de Reciclagem, em caso de suspeita de fraude ou do cometimento de ilícitos.</p>

              <p><strong>c -</strong> Poderão ainda ser utilizadas as informações para regular a disponibilização de opções de resgate e acúmulo de Créditos de Reciclagem, bem como para personalização do atendimento ao Cliente Reciclador.</p>

              <p><strong>5 - RESPONSABILIDADE E EXCLUSÃO DE PARTICIPANTE</strong></p>

              <p><strong>5.1 -</strong> O Cliente Reciclador é o responsável por todos os atos que sejam realizados com o uso de sua senha e eventual código de autorização, o que inclui a responsabilidade por prejuízos em decorrência da utilização indevida por terceiros, eximindo a Recicletool Reciclagem e o Programa Recicletol de responsabilidade por qualquer uso indevido.</p>

              <p><strong>5.2 -</strong> Em caso de danos ou prejuízo à Recicletool Reciclagem, a seu nome ou interesse, o Cliente Reciclador será responsável a indenizar a empresa de todos os prejuízos por ela suportados.</p>

              <p><strong>5.3 -</strong> A Recicletool Reciclagem se reserva o direito de excluir o Cliente Reciclador da sua rede e de cancelar sua Pontuação, independentemente de serem tomadas as medidas judiciais cabíveis, no momento em que tiver conhecimento da conduta ilegal ou contrária ao disposto nesse Regulamento, falsidade ou de má-fé empregadas pelo Participante na utilização ou obtenção dos benefícios da rede, podendo impedir seu posterior regresso, sem quaisquer ressarcimentos.</p>

              <p><strong>5.4 –</strong> Serão excluídas todas as contas de Clientes Recicladores que não realizarem movimentações (reciclagens em máquinas Recicletool vinculadas ao Programa Recicletool) no prazo de 60 dias corridos contados da última movimentação.</p>

              <p><strong>5.5 -</strong> As especificações técnicas, a qualidade e a garantia dos produtos e/ou serviços constantes dos Parceiros são de inteira responsabilidade dos respectivos fabricantes e/ou fornecedores, assim como a eventual entrega, montagem e/ou instalação do produto.</p>

              <p><strong>5.6 -</strong> A Recicletool Reciclagem não se responsabiliza pelos programas de relacionamento e/ou incentivo à fidelidade comercial de seus Parceiros, nem pela coleta e pelo tratamento de dados realizada diretamente pelos Parceiros, em razão da adesão do Cliente Reciclador a seus programas.</p>

              <p><strong>6 - DISPOSIÇÕES GERAIS</strong></p>

              <p><strong>6.1 -</strong> Parceiros do Programa Recicletool: A Recicletool Reciclagem reserva-se o direito de, a qualquer tempo e independentemente de anuência prévia dos Clientes Recicladores, incluir, excluir ou modificar a participação de Parceiros de Resgate, no Programa Recicletool.</p>

              <p><strong>6.2 -</strong> Este Regulamento poderá ser alterado, a qualquer tempo, e a exclusivo critério da Recicletool Reciclagem, mediante prévia comunicação aos Clientes Recicladores, por meio de registro do Instrumento de Alteração no Órgão Público competente.</p>

              <p><strong>6.3 -</strong> Omissão: Toda e qualquer situação não prevista neste Regulamento, bem como eventuais casos omissos, serão decididos, única e exclusivamente pela Recicletool Reciclagem.</p>

              <p><strong>6.4 -</strong> O presente Regulamento encontra-se devidamente registrado perante o Ofício de Registro de Títulos e Documentos da Cidade de Recife, e permanecerá válido indeterminadamente até ser substituído, a critério da Recicletool Reciclagem, por novo regulamento a ser devidamente registrado.</p>

              <p><strong>6.5 -</strong> Qualquer omissão, concessão ou tolerância por parte da Recicletool Reciclagem quanto ao cumprimento das disposições deste Regulamento, não constituirá renúncia, ineficácia ou novação de obrigação, e nem afetará o direito da mesma de exigir o cumprimento destas disposições. Toda e qualquer renúncia, reconhecimento de ineficácia ou novação de obrigação somente será válida se efetuada por escrito e devidamente assinada pelo representante legal da empresa.</p>

              <p><strong>6.6 -</strong> Caso Fortuito e Força Maior: A Recicletool Reciclagem não será considerada em mora ou inadimplemento de quaisquer de suas obrigações previstas neste Regulamento se o motivo de seu descumprimento decorrer de caso fortuito ou força maior.</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
  )
}

export default Regulations
