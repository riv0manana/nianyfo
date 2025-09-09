import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logoutAdmin } from '../services/firebase';

interface HeaderProps {
  currentView: 'user' | 'admin';
  onViewChange: (view: 'user' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      onViewChange('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-500 p-2 rounded-xl">
              <i className="bi bi-truck text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Livraison Antalaha
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Service de livraison communautaire
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewChange('user')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'user'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className="bi bi-person mr-2"></i>
              <span className="hidden sm:inline">Client</span>
            </button>
            
            {user ? (
              <>
                <button
                  onClick={() => onViewChange('admin')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentView === 'admin'
                      ? 'bg-accent-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="bi bi-speedometer2 mr-2"></i>
                  <span className="hidden sm:inline">Admin</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-300"
                  title="Déconnexion"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="hidden sm:inline ml-2">Déconnexion</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onViewChange('admin')}
                className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
              >
                <i className="bi bi-shield-lock mr-2"></i>
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
