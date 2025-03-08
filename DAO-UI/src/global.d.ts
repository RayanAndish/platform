declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  interface Ethereum {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress?: string;
    networkVersion?: string;
  }
  
  interface Window {
    ethereum?: Ethereum;
  }
  