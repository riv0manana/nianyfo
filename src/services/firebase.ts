import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase';
import { DeliveryRequest } from '../types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication functions
export const loginAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions
export const addDeliveryRequest = async (requestData: Omit<DeliveryRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'deliveryRequests'), {
      ...requestData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getDeliveryRequests = async (): Promise<DeliveryRequest[]> => {
  try {
    const q = query(collection(db, 'deliveryRequests'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as DeliveryRequest[];
  } catch (error) {
    throw error;
  }
};

export const updateRequestStatus = async (id: string, status: DeliveryRequest['status']) => {
  try {
    const requestRef = doc(db, 'deliveryRequests', id);
    await updateDoc(requestRef, {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};
