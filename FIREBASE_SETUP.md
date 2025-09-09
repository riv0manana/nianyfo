# Firebase Setup Instructions

## Step 1: Create/Access Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable the following services:

### Authentication Setup
1. Go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Add an admin user:
   - Go to Authentication > Users
   - Click "Add user"
   - Enter admin email and password
   - This will be used to access the admin dashboard

### Firestore Database Setup
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. The app will automatically create the "deliveryRequests" collection

## Step 2: Get Your Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. If no web app exists, click "Add app" and select Web (</>) 
4. Copy the config object
5. Replace the constants in `src/config/firebase.ts`

## Step 3: Update Firebase Config

Replace the constant values in `src/config/firebase.ts` with your actual Firebase project credentials:

```javascript
// Replace these constants with your actual Firebase values
const VITE_FIREBASE_API_KEY = "AIzaSyC..."; // Your actual API key
const VITE_FIREBASE_AUTH_DOMAIN = "your-project.firebaseapp.com";
const VITE_FIREBASE_PROJECT_ID = "your-actual-project-id";
const VITE_FIREBASE_STORAGE_BUCKET = "your-project.appspot.com";
const VITE_FIREBASE_MESSAGING_SENDER_ID = "123456789";
const VITE_FIREBASE_APP_ID = "1:123456789:web:abc123";
```

## Step 4: Production Deployment (Environment Variables)

For production deployment, you can set these as environment variables on your hosting platform:

### Vercel
1. Go to your project dashboard
2. Settings > Environment Variables
3. Add each variable:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

### Netlify
1. Go to Site settings > Environment variables
2. Add the same variables as above

### Other Platforms
Follow your platform's environment variable setup guide and add the VITE_FIREBASE_* variables.

## Step 5: Test the Connection

1. Submit a delivery request from the user interface
2. Check your Firestore console to see if the data appears
3. Try logging into the admin dashboard with your admin credentials

## Data Structure

The app stores delivery requests in Firestore with this structure:

```
deliveryRequests (collection)
├── [document-id]
    ├── clientName: string
    ├── clientPhone: string  
    ├── description: string
    ├── category: string
    ├── budget: number
    ├── image?: string (base64)
    ├── status: 'pending' | 'finding' | 'delivering' | 'completed'
    ├── createdAt: timestamp
    └── updatedAt: timestamp
```

## Security Best Practices

### Development
- Keep your Firebase config values in the config file
- Don't commit sensitive values to version control
- Use Firebase security rules to protect data

### Production
- Use environment variables on your hosting platform
- Enable Firebase security rules
- Restrict API key usage in Firebase console

## Security Rules (Production)

Update your Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to deliveryRequests for authenticated users
    match /deliveryRequests/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Troubleshooting

- **Connection errors**: Double-check your config values
- **Auth errors**: Ensure Email/Password is enabled and admin user exists
- **Permission errors**: Check Firestore rules (start with test mode)
- **Data not appearing**: Check browser console for errors
- **Config warnings**: Update the constant values in firebase.ts with your actual credentials
