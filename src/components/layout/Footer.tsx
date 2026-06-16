import { socialConfig } from '../../config/social';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-secondary py-12 border-t border-white/5 mt-auto">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-display font-semibold text-white mb-4">PROMOTORA<span className="text-accent">.</span></h3>
          <p className="text-sm opacity-70">
            Construyendo el futuro, diseñando experiencias. Proyectos inmobiliarios de lujo con los más altos estándares de calidad.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 tracking-wider">ENLACES</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/propiedades" className="hover:text-accent transition-colors">Propiedades</a></li>
            <li><a href="/contacto" className="hover:text-accent transition-colors">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 tracking-wider">CONTACTO</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>{socialConfig.phoneDisplay}</li>
            <li>Instagram: @{socialConfig.instagram.user}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 tracking-wider">LEGAL</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-white/5 text-xs text-center opacity-50">
        &copy; {new Date().getFullYear()} Promotora. Todos los derechos reservados.
      </div>
    </footer>
  );
}
