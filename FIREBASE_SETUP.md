# Firebase Setup Guide

This guide will walk you through setting up Firebase for document upload and storage functionality in your portfolio website.

## Prerequisites

- Google account
- Node.js and npm installed
- Your project running locally

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "capstone-portfolio")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication (Optional but Recommended)

1. In your Firebase project console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable your preferred sign-in methods (Email/Password, Google, etc.)

## Step 3: Set up Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for now (you can secure it later)
4. Select a location for your database
5. Click "Done"

## Step 4: Set up Storage

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode" for now
4. Select a location for your storage bucket
5. Click "Done"

## Step 5: Get Your Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click "Add app" and select the web icon (</>)
5. Register your app with a nickname
6. Copy the Firebase configuration object

## Step 6: Configure Your Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important:** 
- Replace the values with your actual Firebase configuration
- Add `.env.local` to your `.gitignore` file to keep your keys secure
- Never commit your actual API keys to version control

## Step 7: Configure Firebase Security Rules

### Firestore Rules
Go to Firestore Database > Rules and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to documents collection
    match /documents/{document} {
      allow read, write: if true; // For testing - restrict this in production
    }
  }
}
```

### Storage Rules
Go to Storage > Rules and update with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow upload and download of documents
    match /documents/{allPaths=**} {
      allow read, write: if true; // For testing - restrict this in production
    }
  }
}
```

## Step 8: Test Your Setup

1. Start your development server: `npm run dev`
2. Navigate to the Documents section
3. Try uploading a test file
4. Check Firebase Console to see if the file appears in Storage and metadata in Firestore

## Production Security (Important!)

Before deploying to production, update your security rules:

### Firestore Rules (Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /documents/{document} {
      // Only allow authenticated users to read/write their own documents
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules (Production)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{userId}/{allPaths=**} {
      // Only allow authenticated users to access their own files
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**: Make sure all environment variables are set correctly
2. **Permission denied**: Check your Firestore and Storage security rules
3. **CORS errors**: Make sure your domain is authorized in Firebase project settings
4. **Upload failures**: Check file size limits and file type restrictions in the code

### File Size Limits:
- Default limit is 10MB per file
- You can adjust this in `src/lib/uploadService.ts`
- Firebase Storage has a 5GB limit per file

### Supported File Types:
Currently configured to support:
- PDF documents (.pdf)
- Word documents (.doc, .docx)
- Text files (.txt)
- Images (.jpg, .jpeg, .png, .gif)

You can modify supported types in `src/lib/uploadService.ts`

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

## Support

If you encounter any issues during setup, check the browser console for error messages and refer to the Firebase documentation for detailed troubleshooting steps. 