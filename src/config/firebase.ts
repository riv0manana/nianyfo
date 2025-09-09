// Firebase Configuration
// This config file approach is recommended for better security and deployment flexibility

// Environment variables for Firebase (replace with your actual values)
const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const VITE_FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const VITE_FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const VITE_FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const VITE_FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const VITE_FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;

export const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID
};

// Instructions to update your Firebase credentials:
// 1. Go to https://console.firebase.google.com/
// 2. Select your project (or create a new one)
// 3. Click on "Project Settings" (gear icon)
// 4. Scroll down to "Your apps" section
// 5. If you don't have a web app, click "Add app" and select web (</>) 
// 6. Copy the config object values and replace the constants above

// For production deployment, you can set these as environment variables:
// - Vercel: Add in dashboard under Settings > Environment Variables
// - Netlify: Add in dashboard under Site settings > Environment variables
// - Other platforms: Follow their environment variable setup guides

// Validation to ensure all required config values are present
const requiredConfigKeys = [
  'apiKey',
  'authDomain', 
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId'
];

const missingKeys = requiredConfigKeys.filter(key => 
  !firebaseConfig[key as keyof typeof firebaseConfig] || 
  firebaseConfig[key as keyof typeof firebaseConfig].includes('your-')
);

if (missingKeys.length > 0) {
  console.warn('⚠️ Firebase Config Warning: Please update the following values in src/config/firebase.ts:', missingKeys);
}
