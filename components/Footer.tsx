// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-[#4F2712] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Julia</h3>
            <p className="text-white">Doces e celebrações especiais</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <p className="text-white">Telefone: (XX) XXXX-XXXX</p>
            <p className="text-white">Email: info@julia.com</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Site</h4>
            <p className="text-white">www.julia.com</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Informações</h4>
            <p className="text-gray-400">Sede: 21/12/2023</p>
            <p className="text-gray-400">Número: 1º</p>
            <p className="text-gray-400">Data: 2023/06/02</p>
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