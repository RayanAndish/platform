import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Typography, Space, message, Statistic, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { web3Service } from '@/services/web3.service';
import { formatTokenAmount } from '@/utils/helpers';
import styles from '@/styles/components/StakingDetails.module.css';

const { Title, Text } = Typography;

interface StakingInfo {
  totalStaked: string;
  userStaked: string;
  rewardRate: string;
}

export const StakingDetails: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [staking, setStaking] = useState(false);
  const [unstaking, setUnstaking] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [stakingInfo, setStakingInfo] = useState<StakingInfo>({
    totalStaked: '0',
    userStaked: '0',
    rewardRate: '0',
  });

  const loadStakingInfo = async () => {
    try {
      const address = await web3Service.getAddress();
      const info = await web3Service.getStakingInfo(address);
      setStakingInfo({
        totalStaked: info[0].toString(),
        userStaked: info[1].toString(),
        rewardRate: info[2].toString(),
      });
    } catch (error) {
      console.error('Error loading staking info:', error);
      message.error(t('staking.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStakingInfo();
  }, []);

  const handleStake = async () => {
    if (!stakeAmount) return;
    setStaking(true);
    try {
      const success = await web3Service.stake(stakeAmount);
      if (success) {
        message.success(t('staking.stakeSuccess'));
        setStakeAmount('');
        await loadStakingInfo();
      } else {
        message.error(t('staking.stakeError'));
      }
    } catch (error) {
      console.error('Staking error:', error);
      message.error(t('staking.stakeError'));
    } finally {
      setStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount) return;
    setUnstaking(true);
    try {
      const success = await web3Service.unstake(unstakeAmount);
      if (success) {
        message.success(t('staking.unstakeSuccess'));
        setUnstakeAmount('');
        await loadStakingInfo();
      } else {
        message.error(t('staking.unstakeError'));
      }
    } catch (error) {
      console.error('Unstaking error:', error);
      message.error(t('staking.unstakeError'));
    } finally {
      setUnstaking(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>{t('common.loading')}</div>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2}>{t('staking.title')}</Title>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card className={styles.statsCard}>
                <Statistic
                  title={t('staking.totalStaked')}
                  value={formatTokenAmount(stakingInfo.totalStaked)}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card className={styles.statsCard}>
                <Statistic
                  title={t('staking.yourStake')}
                  value={formatTokenAmount(stakingInfo.userStaked)}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card className={styles.statsCard}>
                <Statistic
                  title={t('staking.rewardRate')}
                  value={`${stakingInfo.rewardRate}%`}
                  precision={2}
                />
              </Card>
            </Col>
          </Row>

          <div className={styles.stakeSection}>
            <Title level={4}>{t('staking.stake')}</Title>
            <Space>
              <Input
                placeholder={t('staking.enterAmount')}
                value={stakeAmount}
                onChange={e => setStakeAmount(e.target.value)}
                style={{ width: 200 }}
              />
              <Button
                type="primary"
                onClick={handleStake}
                loading={staking}
                disabled={!stakeAmount}
              >
                {t('staking.stakeButton')}
              </Button>
            </Space>
          </div>

          <div className={styles.unstakeSection}>
            <Title level={4}>{t('staking.unstake')}</Title>
            <Space>
              <Input
                placeholder={t('staking.enterAmount')}
                value={unstakeAmount}
                onChange={e => setUnstakeAmount(e.target.value)}
                style={{ width: 200 }}
              />
              <Button
                type="primary"
                danger
                onClick={handleUnstake}
                loading={unstaking}
                disabled={!unstakeAmount}
              >
                {t('staking.unstakeButton')}
              </Button>
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
}; 