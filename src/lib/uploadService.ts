import { storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';

export interface DocumentMetadata {
  id?: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  downloadURL: string;
  category?: string;
  description?: string;
}

export class DocumentUploadService {
  private static readonly STORAGE_PATH = 'documents';
  private static readonly COLLECTION_NAME = 'documents';

  /**
   * Upload a file to Firebase Storage and save metadata to Firestore
   */
  static async uploadDocument(
    file: File, 
    category?: string, 
    description?: string
  ): Promise<DocumentMetadata> {
    try {
      // Create a unique filename with timestamp
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `${this.STORAGE_PATH}/${fileName}`);

      // Upload file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Create metadata object
      const metadata: Omit<DocumentMetadata, 'id'> = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        downloadURL,
        category,
        description,
      };

      // Save metadata to Firestore
      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        ...metadata,
        uploadedAt: Timestamp.fromDate(metadata.uploadedAt),
      });

      return {
        ...metadata,
        id: docRef.id,
      };
    } catch (error) {
      console.error('Error uploading document:', error);
      throw new Error('Failed to upload document');
    }
  }

  /**
   * Get all uploaded documents
   */
  static async getDocuments(): Promise<DocumentMetadata[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        uploadedAt: doc.data().uploadedAt.toDate(),
      })) as DocumentMetadata[];
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw new Error('Failed to fetch documents');
    }
  }

  /**
   * Delete a document from both Storage and Firestore
   */
  static async deleteDocument(documentId: string, downloadURL: string): Promise<void> {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, this.COLLECTION_NAME, documentId));

      // Extract file path from download URL and delete from Storage
      const storageRef = ref(storage, downloadURL);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new Error('Failed to delete document');
    }
  }

  /**
   * Update document metadata
   */
  static async updateDocument(
    documentId: string, 
    updates: Partial<Pick<DocumentMetadata, 'category' | 'description'>>
  ): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, documentId);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating document:', error);
      throw new Error('Failed to update document');
    }
  }

  /**
   * Validate file before upload
   */
  static validateFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
    ];

    if (file.size > maxSize) {
      return { isValid: false, error: 'File size must be less than 10MB' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'File type not supported. Please upload PDF, Word, text, or image files.' 
      };
    }

    return { isValid: true };
  }
} 