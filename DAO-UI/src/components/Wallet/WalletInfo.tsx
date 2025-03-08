import React from "react";

interface WalletInfoProps {
  account: string;
  network: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ account, network }) => {
  return (
    <div className="mt-5">
      <h2 className="text-lg font-bold">Wallet Info</h2>
      <p>
        <strong>Account:</strong> {account || "Not connected"}
      </p>
      <p>
        <strong>Network:</strong> {network || "Unknown"}
      </p>
    </div>
  );
};

export default WalletInfo;