import React, { useState } from "react";
import styles from "../../styles/components/WalletDashboard.module.css";

const networks = [
  { id: "0x1", name: "Ethereum Mainnet" },
  { id: "0x3", name: "Ropsten Testnet" },
  { id: "0x4", name: "Rinkeby Testnet" },
  { id: "0x5", name: "Goerli Testnet" },
  { id: "0x2a", name: "Kovan Testnet" },
];

const WalletDashboard: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [showWalletInfo, setShowWalletInfo] = useState(true);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleNetworkChange = (network: typeof networks[0]) => {
    setSelectedNetwork(network);
    setIsDropdownOpen(false);
    console.log(`Network switched to: ${network.name}`);
  };

  const handleToggleWalletInfo = () => setShowWalletInfo(!showWalletInfo);

  return (
    <div className={styles.walletDashboard}>
      <div className={styles.walletHeader}>
        <button className={styles.walletButton} onClick={toggleDropdown}>
          Wallet Management
        </button>
        {isDropdownOpen && (
          <ul className={styles.walletDropdown}>
            {networks.map((network) => (
              <li
                key={network.id}
                className={styles.walletDropdownItem}
                onClick={() => handleNetworkChange(network)}
              >
                {network.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showWalletInfo && (
        <div className={styles.walletInfo}>
          <p>
            <strong>Account:</strong> 0x55318244dc1f875c4b955480ac70410bc1d85a08
          </p>
          <p>
            <strong>Network:</strong> {selectedNetwork.name}
          </p>
        </div>
      )}

      <button
        className={styles.toggleWalletInfo}
        onClick={handleToggleWalletInfo}
      >
        {showWalletInfo ? "Hide Wallet Info" : "Show Wallet Info"}
      </button>
    </div>
  );
};

export default WalletDashboard;