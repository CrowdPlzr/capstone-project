import { NextResponse } from 'next/server';
import { googleDriveService } from '@/lib/googleDrive';

export async function GET() {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    if (!folderId) {
      return NextResponse.json(
        { error: 'Google Drive folder ID not configured' },
        { status: 500 }
      );
    }

    const files = await googleDriveService.getFilesFromFolder(folderId);
    return NextResponse.json(files);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
} 