import { useState, useEffect } from "react";

interface WalletState {
  account: string | null;
  network: string | null;
  isConnected: boolean;
}

const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    account: null,
    network: null,
    isConnected: false,
  });

  useEffect(() => {
    if ((window as any).ethereum) {
      const ethereum = (window as any).ethereum as Ethereum;

      ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletState((prevState) => ({
            ...prevState,
            account: accounts[0],
            isConnected: true,
          }));
        } else {
          setWalletState({
            account: null,
            network: null,
            isConnected: false,
          });
        }
      });

      ethereum.on("chainChanged", (chainId: string) => {
        setWalletState((prevState) => ({
          ...prevState,
          network: getNetworkName(chainId),
        }));
      });

      const initializeWallet = async () => {
        try {
          const accounts: string[] = await ethereum.request({
            method: "eth_accounts",
          });
          const chainId: string = await ethereum.request({
            method: "eth_chainId",
          });

          setWalletState({
            account: accounts.length > 0 ? accounts[0] : null,
            network: getNetworkName(chainId),
            isConnected: accounts.length > 0,
          });
        } catch (error) {
          console.error("Failed to initialize wallet:", error);
        }
      };

      initializeWallet();
    }
  }, []);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const ethereum = (window as any).ethereum as Ethereum;
      try {
        const accounts: string[] = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId: string = await ethereum.request({
          method: "eth_chainId",
        });

        setWalletState({
          account: accounts[0],
          network: getNetworkName(chainId),
          isConnected: true,
        });
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("MetaMask is not installed.");
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      account: null,
      network: null,
      isConnected: false,
    });
  };

  const getNetworkName = (chainId: string): string => {
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet";
      case "0x3":
        return "Ropsten Testnet";
      case "0x4":
        return "Rinkeby Testnet";
      case "0x5":
        return "Goerli Testnet";
      case "0x2a":
        return "Kovan Testnet";
      case "0x539":
        return "Ganache";
      default:
        return "Unknown Network";
    }
  };

  return {
    walletState,
    connectWallet,
    disconnectWallet,
  };
};

export default useWallet;