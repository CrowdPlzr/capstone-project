import { google } from 'googleapis';

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink: string;
  webContentLink?: string;
  description?: string;
}

interface GoogleDriveApiFile {
  id?: string | null;
  name?: string | null;
  mimeType?: string | null;
  size?: string | null;
  modifiedTime?: string | null;
  webViewLink?: string | null;
  webContentLink?: string | null;
  description?: string | null;
}

class GoogleDriveService {
  private drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async getFilesFromFolder(folderId: string): Promise<GoogleDriveFile[]> {
    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink,webContentLink,description)',
        orderBy: 'modifiedTime desc',
      });

      return response.data.files?.map((file: GoogleDriveApiFile) => ({
        id: file.id!,
        name: file.name!,
        mimeType: file.mimeType!,
        size: file.size || undefined,
        modifiedTime: file.modifiedTime!,
        webViewLink: file.webViewLink!,
        webContentLink: file.webContentLink || undefined,
        description: file.description || undefined,
      })) || [];
    } catch (error) {
      console.error('Error fetching files from Google Drive:', error);
      return [];
    }
  }

  async getFileById(fileId: string): Promise<GoogleDriveFile | null> {
    try {
      const response = await this.drive.files.get({
        fileId,
        fields: 'id,name,mimeType,size,modifiedTime,webViewLink,webContentLink,description',
      });

      const file = response.data;
      return {
        id: file.id!,
        name: file.name!,
        mimeType: file.mimeType!,
        size: file.size || undefined,
        modifiedTime: file.modifiedTime!,
        webViewLink: file.webViewLink!,
        webContentLink: file.webContentLink || undefined,
        description: file.description || undefined,
      };
    } catch (error) {
      console.error('Error fetching file from Google Drive:', error);
      return null;
    }
  }

  // Helper method to check if file is a Google Doc/Sheet/Slide for embedding
  isGoogleWorkspaceFile(mimeType: string): boolean {
    return [
      'application/vnd.google-apps.document',
      'application/vnd.google-apps.spreadsheet',
      'application/vnd.google-apps.presentation',
    ].includes(mimeType);
  }

  // Get embeddable URL for Google Workspace files
  getEmbedUrl(file: GoogleDriveFile): string {
    if (this.isGoogleWorkspaceFile(file.mimeType)) {
      return `https://docs.google.com/document/d/${file.id}/preview`;
    }
    return file.webViewLink;
  }
}

export const googleDriveService = new GoogleDriveService(); 