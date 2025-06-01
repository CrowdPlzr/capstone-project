# Google Drive API Setup Guide

This guide will help you set up Google Drive API integration for your capstone portfolio website.

## Prerequisites

- Google account
- Google Cloud Platform project
- Google Drive folder with your capstone assignments

## Step 1: Google Cloud Console Setup

### 1.1 Create or Select Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

### 1.2 Enable Google Drive API
1. In the Google Cloud Console, go to **APIs & Services > Library**
2. Search for "Google Drive API"
3. Click on it and press **Enable**

### 1.3 Create Service Account
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > Service Account**
3. Fill in the service account details:
   - **Service account name**: `capstone-drive-reader`
   - **Description**: `Service account for reading capstone assignments from Google Drive`
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

### 1.4 Generate Service Account Key
1. In the **Service Accounts** section, click on your newly created service account
2. Go to the **Keys** tab
3. Click **Add Key > Create New Key**
4. Select **JSON** format and click **Create**
5. Download and save the JSON file securely

## Step 2: Google Drive Setup

### 2.1 Create Capstone Folder
1. Go to [Google Drive](https://drive.google.com/)
2. Create a new folder for your capstone assignments
3. Upload your assignment documents (Google Docs, PDFs, etc.)

### 2.2 Share Folder with Service Account
1. Right-click on your capstone folder
2. Select **Share**
3. Add the service account email (found in your JSON key file as `client_email`)
4. Give it **Viewer** permissions
5. Click **Send**

### 2.3 Get Folder ID
1. Open your capstone folder in Google Drive
2. Copy the folder ID from the URL:
   ```
   https://drive.google.com/drive/folders/[FOLDER_ID_HERE]
   ```

## Step 3: Environment Configuration

### 3.1 Create Environment File
Create a `.env.local` file in your project root:

```env
# Google Drive API Configuration
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_from_step_2.3
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

### 3.2 Extract Values from JSON Key
From your downloaded JSON key file, extract:
- `client_email` → Copy to `GOOGLE_CLIENT_EMAIL`
- `private_key` → Copy to `GOOGLE_PRIVATE_KEY` (keep the quotes and \n characters)

## Step 4: Install Dependencies

Run the following command to install the required packages:

```bash
npm install googleapis
```

## Step 5: Test Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/capstone` in your browser
3. You should see your Google Drive files listed as assignment cards
4. Click on any assignment to view it embedded

## File Type Support

### Supported for Preview
- ✅ Google Docs
- ✅ Google Sheets  
- ✅ Google Slides
- ✅ PDFs (limited support)

### View Only (opens in Google Drive)
- 📄 Word documents (.docx)
- 🖼️ Images
- 📎 Other file types

## Troubleshooting

### Common Issues

**Error: "Failed to load assignments"**
- Check that your service account email has access to the folder
- Verify your folder ID is correct
- Ensure Google Drive API is enabled

**Error: "Assignment not found"**
- File might be in a subfolder (not currently supported)
- File might be trashed
- Service account might not have access to specific files

**Error: "Module 'googleapis' not found"**
- Run `npm install googleapis`
- Restart your development server

### Security Notes

- ⚠️ Never commit your `.env.local` file to version control
- 🔒 Keep your service account JSON key secure
- 👥 Only share folder access with the service account (not individual files)
- 🔄 Rotate service account keys periodically

## File Organization Tips

### Recommended Folder Structure
```
📁 Capstone Assignments/
├── 📄 Assignment 1 - Security Analysis
├── 📄 Assignment 2 - Framework Implementation  
├── 📄 Assignment 3 - Risk Assessment
├── 📊 Data Analysis Spreadsheet
└── 📽️ Final Presentation
```

### File Naming Best Practices
- Use descriptive names
- Include assignment numbers
- Avoid special characters
- Keep names under 50 characters

## Next Steps

Once setup is complete:
1. Upload your capstone assignments to Google Drive
2. They'll automatically appear on your portfolio site
3. Each assignment gets its own dedicated page
4. Visitors can view Google Docs directly embedded
5. Other files open in Google Drive for viewing

Your capstone portfolio is now powered by Google Drive! 🚀 