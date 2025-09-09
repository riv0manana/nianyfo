import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RequestForm from './components/RequestForm';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { DeliveryRequest } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'user' | 'admin'>('user');
  const [requests, setRequests] = useState<DeliveryRequest[]>([]);

  // Load requests from localStorage on component mount
  useEffect(() => {
    const savedRequests = localStorage.getItem('antalaha-delivery-requests');
    if (savedRequests) {
      try {
        const parsedRequests = JSON.parse(savedRequests).map((req: any) => ({
          ...req,
          createdAt: new Date(req.createdAt),
          updatedAt: new Date(req.updatedAt)
        }));
        setRequests(parsedRequests);
      } catch (error) {
        console.error('Erreur lors du chargement des demandes:', error);
      }
    }
  }, []);

  // Save requests to localStorage whenever requests change
  useEffect(() => {
    localStorage.setItem('antalaha-delivery-requests', JSON.stringify(requests));
  }, [requests]);

  const handleSubmitRequest = (requestData: Omit<DeliveryRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: DeliveryRequest = {
      ...requestData,
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setRequests(prev => [newRequest, ...prev]);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    successMessage.innerHTML = `
      <div class="flex items-center">
        <i class="bi bi-check-circle mr-2"></i>
        <span>Demande envoyée avec succès!</span>
      </div>
    `;
    document.body.appendChild(successMessage);
    
    window.setTimeout(() => {
      successMessage.style.transform = 'translateX(0)';
    }, 100);
    
    window.setTimeout(() => {
      successMessage.style.transform = 'translateX(100%)';
      window.setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 300);
    }, 3000);
  };

  const handleUpdateStatus = (id: string, status: DeliveryRequest['status']) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status, updatedAt: new Date() }
          : request
      )
    );

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    successMessage.innerHTML = `
      <div class="flex items-center">
        <i class="bi bi-check-circle mr-2"></i>
        <span>Statut mis à jour avec succès!</span>
      </div>
    `;
    document.body.appendChild(successMessage);
    
    window.setTimeout(() => {
      successMessage.style.transform = 'translateX(0)';
    }, 100);
    
    window.setTimeout(() => {
      successMessage.style.transform = 'translateX(100%)';
      window.setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 300);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-primary">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="min-h-screen py-8">
        {currentView === 'user' ? (
          <div>
            <div className="text-center mb-8 px-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Besoin de quelque chose de Sambava ?
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Économisez votre temps et votre argent. Nous nous occupons de trouver et livrer 
                tout ce dont vous avez besoin, le jour même.
              </p>
            </div>
            <RequestForm onSubmit={handleSubmitRequest} />
          </div>
        ) : (
          <AdminDashboard 
            requests={requests} 
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
