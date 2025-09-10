import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import RequestForm from './components/RequestForm';
import AdminDashboard from './components/AdminDashboard';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';

function AppContent() {
  const [currentView, setCurrentView] = useState<'user' | 'admin'>('user');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user, loading } = useAuth();

  const handleSubmitRequest = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLoginSuccess = () => {
    setCurrentView('admin');
  };

  // Show loading screen while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-primary-500 p-4 rounded-full mb-4 inline-block">
            <i className="bi bi-truck text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">NianyFô</h2>
          <div className="flex items-center justify-center space-x-2">
            <i className="bi bi-arrow-clockwise animate-spin text-primary-500"></i>
            <span className="text-gray-600">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show login form if trying to access admin without authentication
  if (currentView === 'admin' && !user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-primary">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="min-h-screen py-8">
        {currentView === 'user' ? (
          <div>
            <div className="text-center mb-8 px-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Besoin de faire votre course à Sambava ?
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Économisez votre temps et optimisez votre budget, pour seulement 5.000Ar, nous faisons votre course à Sambava et vous livre le même jour de 17h - 19h.
              </p>
            </div>
            <RequestForm onSubmit={handleSubmitRequest} />
          </div>
        ) : (
          <AdminDashboard key={refreshTrigger} />
        )}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
