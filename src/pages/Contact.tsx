import { motion } from 'framer-motion';
import { Phone, MessageCircle, AtSign } from 'lucide-react';
import { socialConfig } from '../config/social';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-4">Conversemos</h1>
          <p className="text-secondary font-light max-w-xl mx-auto">
            Estamos aquí para brindarte una atención personalizada y resolver cualquier inquietud sobre nuestros proyectos exclusivos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-2xl font-display text-white mb-8">Información de Contacto</h2>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Teléfono Directo</h3>
                    <p className="text-secondary font-light text-sm">{socialConfig.phoneDisplay}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mr-4 shrink-0">
                    <AtSign className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Instagram Oficial</h3>
                    <a href={socialConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="text-secondary font-light text-sm hover:text-accent transition-colors">
                      @{socialConfig.instagram.user}
                    </a>
                  </div>
                </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-dark p-8 md:p-10"
          >
            <h2 className="text-2xl font-display text-white mb-6">Atención Inmediata</h2>
            <p className="text-secondary font-light mb-8 leading-relaxed">
              Sabemos que tu tiempo es valioso. Por eso hemos simplificado nuestro canal de comunicación. Toca el botón a continuación y uno de nuestros asesores premium te atenderá directamente vía WhatsApp.
            </p>
            <a 
              href={`${socialConfig.whatsappUrl}?text=Hola.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20proyectos.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-5 font-medium tracking-widest hover:bg-[#128C7E] transition-colors duration-300 flex justify-center items-center rounded-sm"
            >
              <MessageCircle className="mr-3" size={24} />
              INICIAR CHAT EN WHATSAPP
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
