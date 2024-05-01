import CryptoJS from 'crypto-js';


const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '';

export const encryptData = (data: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    return data; // Return original data if encryption fails
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption failed:', error);
    return encryptedData; // Return encrypted data if decryption fails
  }
};

export const hashData = (data: string): string => {
  return CryptoJS.SHA256(data).toString();
};

export const generateSecureId = (): string => {
  return CryptoJS.lib.WordArray.random(16).toString();
};

export const validateDocument = (document: any): boolean => {
  if (!document || typeof document !== 'object') return false;
  if (!document.id || typeof document.id !== 'string') return false;
  if (!document.title || typeof document.title !== 'string') return false;
  if (!Array.isArray(document.content)) return false;
  if (!document.lastModified || (typeof document.lastModified !== 'string' && !(document.lastModified instanceof Date))) return false;
  
  return true;
};
