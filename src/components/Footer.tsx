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
                <h3 className="text-xl font-bold">NianyFô</h3>
                <p className="text-gray-400 text-sm">Votre coursier de confiance</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Votre temps est précieux. Nous assurons de faire vos course à Sambava, et vous faire livrer le jour même
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <i className="bi bi-geo-alt mr-3"></i>
                <span>Antalaha, Madagascar</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="bi bi-telephone mr-3"></i>
                <span>+261 38 51 007 62</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="bi bi-envelope mr-3"></i>
                <span>contact@riv0manana.dev</span>
              </div>
            </div>
            

            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <i className="bi bi-geo-alt mr-3"></i>
                <span>Sambava, Madagascar</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="bi bi-telephone mr-3"></i>
                <span>+261 32 15 941 45</span>
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
                <span>Dimanche</span>
                <span>Fermé</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-center items-center">
          NianyFô © 2024 riv0manana.dev
        </div>
      </div>
    </footer>
  );
};

export default Footer;
