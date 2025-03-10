import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import apiService from '../../services/api.service';
import styles from './StakingPage.module.css';

interface StakingInfo {
  totalStaked: string;
  userStake: string;
  rewards: string;
  apr: string;
}

export const StakingPage: React.FC = () => {
  const { account, active } = useWeb3React();
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (active && account) {
      fetchStakingInfo();
    }
  }, [active, account]);

  const fetchStakingInfo = async () => {
    try {
      const response = await apiService.getStakingInfo();
      setStakingInfo(response.data);
    } catch (err) {
      setError('Failed to fetch staking information');
      console.error(err);
    }
  };

  const handleStake = async () => {
    if (!amount) return;
    setLoading(true);
    setError('');

    try {
      await apiService.stake(amount);
      await fetchStakingInfo();
      setAmount('');
    } catch (err) {
      setError('Failed to stake tokens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!amount) return;
    setLoading(true);
    setError('');

    try {
      await apiService.unstake(amount);
      await fetchStakingInfo();
      setAmount('');
    } catch (err) {
      setError('Failed to unstake tokens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!active) {
    return (
      <div className={styles.container}>
        <p>Please connect your wallet to access staking features.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Staking Dashboard</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {stakingInfo && (
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Total Staked</h3>
            <p>{stakingInfo.totalStaked}</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Your Stake</h3>
            <p>{stakingInfo.userStake}</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Available Rewards</h3>
            <p>{stakingInfo.rewards}</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Current APR</h3>
            <p>{stakingInfo.apr}%</p>
          </div>
        </div>
      )}

      <div className={styles.actionSection}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className={styles.input}
        />
        <div className={styles.buttonGroup}>
          <button
            onClick={handleStake}
            disabled={loading || !amount}
            className={styles.button}
          >
            {loading ? 'Processing...' : 'Stake'}
          </button>
          <button
            onClick={handleUnstake}
            disabled={loading || !amount}
            className={styles.button}
          >
            {loading ? 'Processing...' : 'Unstake'}
          </button>
        </div>
      </div>
    </div>
  );
};