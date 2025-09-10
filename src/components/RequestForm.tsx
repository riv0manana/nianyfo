import React, { useState } from 'react';
import { categories } from '../data/categories';
import { addDeliveryRequest } from '../services/firebase';

interface RequestFormProps {
  onSubmit: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    description: '',
    category: '',
    budget: '',
    image: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Le nom est requis';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Le téléphone est requis';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.clientPhone)) {
      newErrors.clientPhone = 'Format de téléphone invalide';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.category) {
      newErrors.category = 'Veuillez sélectionner une catégorie';
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Le budget doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showSuccessMessage = () => {
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
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 300);
    }, 3000);
  };

  const showErrorMessage = (message: string) => {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    errorMessage.innerHTML = `
      <div class="flex items-center">
        <i class="bi bi-exclamation-triangle mr-2"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(errorMessage);
    
    window.setTimeout(() => {
      errorMessage.style.transform = 'translateX(0)';
    }, 100);
    
    window.setTimeout(() => {
      errorMessage.style.transform = 'translateX(100%)';
      window.setTimeout(() => {
        if (document.body.contains(errorMessage)) {
          document.body.removeChild(errorMessage);
        }
      }, 300);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await addDeliveryRequest({
        ...formData,
        budget: parseFloat(formData.budget),
        status: 'pending'
      });

      setFormData({
        clientName: '',
        clientPhone: '',
        description: '',
        category: '',
        budget: '',
        image: ''
      });

      setErrors({});
      showSuccessMessage();
      onSubmit();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      showErrorMessage('Erreur lors de l\'envoi de la demande');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Nouvelle Demande</h2>
          <p className="text-primary-100">
            Décrivez ce dont vous avez besoin avec détails et nous nous en occupons de chercher et faire l'achat
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="bi bi-person mr-2"></i>
                Nom complet *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                  errors.clientName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre nom complet"
              />
              {errors.clientName && (
                <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="bi bi-telephone mr-2"></i>
                Téléphone *
              </label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                  errors.clientPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+261 XX XX XXX XX"
              />
              {errors.clientPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <i className="bi bi-card-text mr-2"></i>
              Description détaillée *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Décrivez précisément ce que vous recherchez..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <i className="bi bi-grid mr-2"></i>
              Catégorie *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    formData.category === category.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${category.icon} text-2xl mb-2 block`}></i>
                  <span className="text-xs font-medium">{category.name}</span>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-2">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <i className="bi bi-currency-dollar mr-2"></i>
              Budget (Ar) *
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                errors.budget ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Montant en Ariary"
              min="0"
            />
            {errors.budget && (
              <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <i className="bi bi-image mr-2"></i>
              Image (optionnel)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {formData.image ? (
                  <div className="space-y-3">
                    <img
                      src={formData.image}
                      alt="Aperçu"
                      className="max-w-full h-32 object-cover mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600">Cliquez pour changer</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <i className="bi bi-cloud-upload text-4xl text-gray-400"></i>
                    <p className="text-gray-600">
                      Cliquez pour ajouter une image
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-primary-600 hover:to-primary-700 focus:ring-4 focus:ring-primary-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                Envoi en cours...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <i className="bi bi-send mr-2"></i>
                Envoyer la demande
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
