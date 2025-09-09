export interface DeliveryRequest {
  id: string;
  clientName: string;
  clientPhone: string;
  description: string;
  category: string;
  budget: number;
  image?: string;
  status: 'pending' | 'finding' | 'delivering' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
