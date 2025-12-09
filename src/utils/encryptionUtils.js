import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'b996f71f980cbd62c4d59a0f38707e25';

export class EncryptionUtils {
  static encrypt(text) {
    try {
      if (!text) throw new Error('No text to encrypt');
      return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
    } catch (error) {
      console.error('🔐 Frontend Encryption error:', error);
      throw new Error('Encryption failed');
    }
  }

  static decrypt(encryptedText) {
    try {
      if (!encryptedText) throw new Error('No text to decrypt');
      const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) throw new Error('Decryption resulted in empty string');
      return decrypted;
    } catch (error) {
      console.error('🔓 Frontend Decryption error:', error);
      throw new Error('Decryption failed');
    }
  }

  static testEncryption() {
    try {
      const testData = 'test-api-endpoint';
      const encrypted = this.encrypt(testData);
      const decrypted = this.decrypt(encrypted);
      
      const success = testData === decrypted;
      console.log('🧪 Frontend Encryption Test:', { success, original: testData, decrypted });
      return success;
    } catch (error) {
      console.error('🧪 Frontend Encryption Test Failed:', error);
      return false;
    }
  }
}

EncryptionUtils.testEncryption();