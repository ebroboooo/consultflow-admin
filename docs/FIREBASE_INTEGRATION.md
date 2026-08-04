# Firebase & Cloud Persistence Integration Guide

The application is structured to support seamless migration from client-side `localStorage` to **Firebase Cloud Firestore** and **Firebase Authentication**.

---

## 🛠 Steps to Connect Live Firebase

### 1. Configure Firebase Credentials
Add your Firebase Project credentials to `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Update Firebase Service Initialization
In `src/services/firebase.ts`, export active Firestore and Auth instances:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 3. Replace LocalStorage Hook with Realtime Listener
Update client data fetching to listen to Firestore's `onSnapshot`:

```typescript
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'clients'), (snapshot) => {
    const clientData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setClients(clientData);
  });
  return () => unsubscribe();
}, []);
```
