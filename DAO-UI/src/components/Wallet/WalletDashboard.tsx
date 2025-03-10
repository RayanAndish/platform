import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import styles from "../../styles/components/WalletDashboard.module.css";

const supportedNetworks = [
  { id: 1, name: "Ethereum", icon: "🌐" },
  { id: 11155111, name: "Sepolia", icon: "🔷" },
  { id: 137, name: "Polygon", icon: "💜" },
  { id: 80001, name: "Mumbai", icon: "💜" },
  { id: 56, name: "BSC", icon: "💛" },
];

const WalletDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const [networkId, setNetworkId] = useState<number>(1);
  const [balance, setBalance] = useState<string>("0");
  const [isConnecting, setIsConnecting] = useState(false);

  // کوتاه کردن آدرس کیف پول
  const shortenAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // بررسی وجود MetaMask
  const checkIfWalletIsInstalled = () => {
    const { ethereum } = window as any;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  // دریافت موجودی کیف پول
  const getBalance = async (address: string) => {
    if (web3 && address) {
      try {
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(Number(balanceEth).toFixed(4));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  // اتصال به کیف پول
  const connectWallet = async () => {
    if (!checkIfWalletIsInstalled()) {
      window.open('https://metamask.io/download.html', '_blank');
      return;
    }

    setIsConnecting(true);
    try {
      const { ethereum } = window as any;
      const web3Instance = new Web3(ethereum);
      setWeb3(web3Instance);

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
      const chainIdNum = parseInt(chainIdHex, 16);
      
      setAccount(accounts[0]);
      setNetworkId(chainIdNum);
      await getBalance(accounts[0]);

      // گوش دادن به تغییرات حساب
      ethereum.on('accountsChanged', (newAccounts: string[]) => {
        setAccount(newAccounts[0]);
        getBalance(newAccounts[0]);
      });

      // گوش دادن به تغییرات شبکه
      ethereum.on('chainChanged', (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        setNetworkId(newChainId);
        if (account) {
          getBalance(account);
        }
      });

    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // قطع اتصال کیف پول
  const disconnectWallet = () => {
    setAccount("");
    setBalance("0");
    setIsDropdownOpen(false);
  };

  // تغییر شبکه
  const switchNetwork = async (chainId: number) => {
    if (!web3) return;

    try {
      const { ethereum } = window as any;
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      console.error("Error switching network:", error);
    }
    setIsNetworkMenuOpen(false);
  };

  // بستن منوها با کلیک خارج از آنها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.walletDashboard}`)) {
        setIsDropdownOpen(false);
        setIsNetworkMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // به‌روزرسانی موجودی به صورت دوره‌ای
  useEffect(() => {
    if (account) {
      const interval = setInterval(() => {
        getBalance(account);
      }, 10000); // هر 10 ثانیه

      return () => clearInterval(interval);
    }
  }, [account, web3]);

  const currentNetwork = supportedNetworks.find(net => net.id === networkId) || supportedNetworks[0];

  return (
    <div className={styles.walletDashboard}>
      {!account ? (
        <button className={styles.connectButton} onClick={connectWallet}>
          {isConnecting ? t("wallet.connecting") : t("wallet.connect")}
        </button>
      ) : (
        <>
          <div className={styles.walletInfo}>
            <button
              className={styles.networkButton}
              onClick={() => setIsNetworkMenuOpen(!isNetworkMenuOpen)}
            >
              <span className={styles.networkIcon}>
                {currentNetwork.icon}
              </span>
              <span>{currentNetwork.name}</span>
            </button>

            <button
              className={styles.addressButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className={styles.balance}>
                {balance} ETH
              </span>
              <span className={styles.address}>{shortenAddress(account)}</span>
            </button>
          </div>

          {isNetworkMenuOpen && (
            <ul className={styles.networkMenu}>
              {supportedNetworks.map((network) => (
                <li
                  key={network.id}
                  className={`${styles.networkMenuItem} ${networkId === network.id ? styles.active : ""}`}
                  onClick={() => switchNetwork(network.id)}
                >
                  <span className={styles.networkIcon}>{network.icon}</span>
                  {network.name}
                </li>
              ))}
            </ul>
          )}

          {isDropdownOpen && (
            <ul className={styles.walletMenu}>
              <li className={styles.walletMenuItem}>
                <span className={styles.menuItemLabel}>{t("wallet.balance")}</span>
                <span>{balance} ETH</span>
              </li>
              <li className={styles.walletMenuItem}>
                <span className={styles.menuItemLabel}>{t("wallet.address")}</span>
                <span className={styles.fullAddress}>{account}</span>
              </li>
              <li
                className={`${styles.walletMenuItem} ${styles.disconnect}`}
                onClick={disconnectWallet}
              >
                {t("wallet.disconnect")}
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default WalletDashboard;