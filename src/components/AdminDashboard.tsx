import React, { useState } from 'react';
import { DeliveryRequest } from '../types';
import { categories } from '../data/categories';

interface AdminDashboardProps {
  requests: DeliveryRequest[];
  onUpdateStatus: (id: string, status: DeliveryRequest['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ requests, onUpdateStatus }) => {
  const [filter, setFilter] = useState<'all' | DeliveryRequest['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: DeliveryRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'finding': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivering': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: DeliveryRequest['status']) => {
    switch (status) {
      case 'pending': return 'bi-clock';
      case 'finding': return 'bi-search';
      case 'delivering': return 'bi-truck';
      case 'completed': return 'bi-check-circle';
      default: return 'bi-question-circle';
    }
  };

  const getStatusText = (status: DeliveryRequest['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'finding': return 'Recherche';
      case 'delivering': return 'Livraison';
      case 'completed': return 'Terminé';
      default: return status;
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  const getStats = () => {
    return {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      finding: requests.filter(r => r.status === 'finding').length,
      delivering: requests.filter(r => r.status === 'delivering').length,
      completed: requests.filter(r => r.status === 'completed').length,
    };
  };

  const stats = getStats();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h2>
        <p className="text-gray-600">Gérez toutes les demandes de livraison</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <i className="bi bi-list-ul text-2xl text-gray-400"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <i className="bi bi-clock text-2xl text-yellow-400"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Recherche</p>
              <p className="text-2xl font-bold text-blue-700">{stats.finding}</p>
            </div>
            <i className="bi bi-search text-2xl text-blue-400"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Livraison</p>
              <p className="text-2xl font-bold text-orange-700">{stats.delivering}</p>
            </div>
            <i className="bi bi-truck text-2xl text-orange-400"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Terminé</p>
              <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
            </div>
            <i className="bi bi-check-circle text-2xl text-green-400"></i>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Rechercher par nom ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'finding', 'delivering', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filter === status
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Tous' : getStatusText(status)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-lg border border-gray-100 text-center">
            <i className="bi bi-inbox text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune demande trouvée</h3>
            <p className="text-gray-500">
              {filter === 'all' ? 'Aucune demande pour le moment.' : `Aucune demande avec le statut "${getStatusText(filter as DeliveryRequest['status'])}".`}
            </p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {request.clientName}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm space-x-4">
                        <span>
                          <i className="bi bi-telephone mr-1"></i>
                          {request.clientPhone}
                        </span>
                        <span>
                          <i className="bi bi-tag mr-1"></i>
                          {getCategoryName(request.category)}
                        </span>
                        <span>
                          <i className="bi bi-currency-dollar mr-1"></i>
                          {request.budget.toLocaleString()} Ar
                        </span>
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                      <i className={`${getStatusIcon(request.status)} mr-1`}></i>
                      {getStatusText(request.status)}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {request.description}
                  </p>

                  {request.image && (
                    <div className="mb-4">
                      <img
                        src={request.image}
                        alt="Image de la demande"
                        className="max-w-xs h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}

                  <div className="text-sm text-gray-500">
                    Créé le {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="lg:w-64">
                  <h4 className="font-semibold text-gray-900 mb-3">Changer le statut</h4>
                  <div className="space-y-2">
                    {(['pending', 'finding', 'delivering', 'completed'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => onUpdateStatus(request.id, status)}
                        disabled={request.status === status}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                          request.status === status
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                        }`}
                      >
                        <i className={`${getStatusIcon(status)} mr-2`}></i>
                        {getStatusText(status)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
