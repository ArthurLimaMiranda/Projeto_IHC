// components/Footer.tsx
import Link from "next/link";
import logo from '../../public/assets/Logo_2.png'
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#4F2712] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="pb-5">
            <Link href="/">
              <Image src={logo} alt='logo' className="w-[60%]"/>
            </Link>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Fale Conosco</h4>
            <div className="flex justify-center gap-6 mb-4">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-lg py-3 px-4 bg-rose-600 hover:bg-rose-700 transition-colors flex flex-row gap-x-5"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.464"/>
                </svg>
                <span>Whatsapp</span>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com/jujubolos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-lg py-3 px-4 bg-rose-600 hover:bg-rose-700 transition-colors flex flex-row gap-x-5"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.153 2.153c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-2.153 2.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.153-2.153c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 012.153-2.153c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm0-2c-2.19 0-2.458.01-3.542.057-1.19.055-2.227.248-3.138.608-1.02.414-1.928 1.02-2.784 1.876S1.414 4.542 1 5.562c-.36.91-.553 1.948-.608 3.138C.01 9.542 0 9.81 0 12s.01 2.458.057 3.542c.055 1.19.248 2.227.608 3.138.414 1.02 1.02 1.928 1.876 2.784s1.764 1.462 2.784 1.876c.91.36 1.948.553 3.138.608C9.542 23.99 9.81 24 12 24s2.458-.01 3.542-.057c1.19-.055 2.227-.248 3.138-.608 1.02-.414 1.928-1.02 2.784-1.876s1.462-1.764 1.876-2.784c.36-.91.553-1.948.608-3.138C23.99 14.458 24 14.19 24 12s-.01-2.458-.057-3.542c-.055-1.19-.248-2.227-.608-3.138-.414-1.02-1.02-1.928-1.876-2.784s-1.764-1.462-2.784-1.876c-.91-.36-1.948-.553-3.138-.608C14.458.01 14.19 0 12 0z"/>
                  <path d="M12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Informações</h4>
            <div className="grid grid-cols-2 gap-4 gap-y-2 flex-wrap text-sm mt-4">
              <a href="/faq" className="text-rose-600 font-medium hover:underline">
                FAQ
              </a>
              <a href="/contato" className="text-rose-600 font-medium hover:underline">
                Sobre nós
              </a>
              <a href="/entrega" className="text-rose-600 font-medium hover:underline">
                Política de Entrega
              </a>
              <a href="/termos" className="text-rose-600 font-medium hover:underline">
                Termos de Serviço
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-white">
            © {new Date().getFullYear()} Julia. Todos os direitos reservados.
          </p>
        </div>
      </div>       
    </footer>
  );
}