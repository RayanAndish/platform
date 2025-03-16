import { web3Service } from './web3.service';

const TOKEN_KEY = 'dao_auth_token';

class TokenService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY);
  }

  async generateToken(address: string): Promise<string> {
    try {
      // Generate message to sign
      const message = `Sign this message to authenticate: ${Date.now()}`;
      
      // Get signature from wallet
      const signer = await web3Service.getSigner();
      const signature = await signer.signMessage(message);

      // Here you would typically make an API call to your backend to verify
      // the signature and get a JWT token. For now, we'll simulate it:
      const token = `simulated_jwt_${address}_${Date.now()}`;
      
      this.setToken(token);
      return token;
    } catch (error) {
      console.error('Error generating token:', error);
      throw error;
    }
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(): void {
    this.token = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  isTokenValid(): boolean {
    // Here you would typically decode the JWT and check its expiration
    // For now, we'll just check if it exists
    return Boolean(this.token);
  }
}

export const tokenService = new TokenService(); 