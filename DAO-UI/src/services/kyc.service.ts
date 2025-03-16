import axios from 'axios';

interface KYCData {
  fullName: string;
  nationalId: string;
  mobileNumber?: string;
  passportNumber?: string;
  walletAddress: string;
}

class KYCService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  async startKYCProcess(walletAddress: string, data: Omit<KYCData, 'walletAddress'>) {
    try {
      const response = await axios.post(`${this.baseUrl}/kyc/start`, {
        ...data,
        walletAddress
      });
      return response.data;
    } catch (error) {
      console.error('Error starting KYC process:', error);
      throw error;
    }
  }

  async checkKYCStatus(walletAddress: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/kyc/status/${walletAddress}`);
      return response.data;
    } catch (error) {
      console.error('Error checking KYC status:', error);
      throw error;
    }
  }

  async getUserLocation() {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      return {
        isIran: response.data.country_code === 'IR',
        countryCode: response.data.country_code
      };
    } catch (error) {
      console.error('Error getting user location:', error);
      throw error;
    }
  }
}

export const kycService = new KYCService(); 