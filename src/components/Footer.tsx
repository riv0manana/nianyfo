import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-500 p-2 rounded-xl">
                <i className="bi bi-truck text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold">Livraison Antalaha</h3>
                <p className="text-gray-400 text-sm">Service communautaire</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Nous connectons Antalaha à Sambava pour vous faciliter la vie. 
              Commandez ce dont vous avez besoin, nous nous occupons du reste.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <i className="bi bi-geo-alt mr-3"></i>
                <span>Antalaha, Madagascar</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="bi bi-telephone mr-3"></i>
                <span>+261 XX XX XXX XX</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="bi bi-envelope mr-3"></i>
                <span>contact@livraison-antalaha.mg</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Horaires</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span>8h - 17h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span>8h - 12h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Livraison Antalaha. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <span className="text-gray-400 text-sm">Powered by</span>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-md flex items-center justify-center">
                <i className="bi bi-lightning-charge text-white text-xs"></i>
              </div>
              <span className="text-white font-semibold">Websparks AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
