import { NextResponse } from 'next/server';
import { googleDriveService } from '@/lib/googleDrive';

interface Params {
  params: Promise<{ fileId: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { fileId } = await params;
    const file = await googleDriveService.getFileById(fileId);
    
    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(file);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch file' },
      { status: 500 }
    );
  }
} 