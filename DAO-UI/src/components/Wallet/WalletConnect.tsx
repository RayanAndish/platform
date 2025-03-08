import React, { useState, useEffect } from "react";

interface WalletConnectProps {
  onConnect: (account: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      console.log("MetaMask is installed!");
    } else {
      setError("MetaMask is not installed. Please install it to continue.");
    }
  }, []);

  const handleConnectWallet = async () => {
    if ((window as any).ethereum) {
      const ethereum = (window as any).ethereum as Ethereum;
      try {
        const accounts: string[] = await ethereum.request({
          method: "eth_requestAccounts",
        });
        onConnect(accounts[0]);
        setError(null);
      } catch (err) {
        setError("Failed to connect wallet. Please try again.");
        console.error(err);
      }
    } else {
      setError("MetaMask is not installed. Please install it to continue.");
    }
  };
  return (
    <div>
      <button
        onClick={handleConnectWallet}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Connect Wallet
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default WalletConnect;