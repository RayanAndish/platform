import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Row, Col, Progress, Typography, Space, message, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import { web3Service } from '@/services/web3.service';
import { formatDate, formatTokenAmount } from '@/utils/helpers';
import styles from '@/styles/components/ProposalDetails.module.css';

const { Title, Text, Paragraph } = Typography;

interface ProposalData {
  id: number;
  title: string;
  description: string;
  votesFor: string;
  votesAgainst: string;
  deadline: number;
  executed: boolean;
  creator: string;
  totalVotes: string;
}

export const ProposalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [userVotingPower, setUserVotingPower] = useState('0');

  useEffect(() => {
    loadProposalDetails();
    loadUserVotingPower();
  }, [id]);

  const loadProposalDetails = async () => {
    try {
      const proposalData = await web3Service.getProposalDetails(Number(id));
      setProposal({
        id: Number(id),
        ...proposalData,
        totalVotes: (Number(proposalData.votesFor) + Number(proposalData.votesAgainst)).toString()
      });
    } catch (error) {
      console.error('Error loading proposal:', error);
      message.error(t('proposal.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const loadUserVotingPower = async () => {
    try {
      const address = await web3Service.getAddress();
      const power = await web3Service.getVotingPower(address);
      setUserVotingPower(power);
    } catch (error) {
      console.error('Error loading voting power:', error);
    }
  };

  const handleVote = async (support: boolean) => {
    setVoting(true);
    try {
      const success = await web3Service.vote(Number(id), support);
      if (success) {
        message.success(t('proposal.voteSuccess'));
        await loadProposalDetails();
      } else {
        message.error(t('proposal.voteError'));
      }
    } catch (error) {
      console.error('Error voting:', error);
      message.error(t('proposal.voteError'));
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>{t('common.loading')}</div>;
  }

  if (!proposal) {
    return <div className={styles.error}>{t('proposal.notFound')}</div>;
  }

  const votesForPercentage = proposal.totalVotes === '0'
    ? 0
    : (Number(proposal.votesFor) / Number(proposal.totalVotes)) * 100;

  const isActive = Date.now() / 1000 < proposal.deadline;

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2}>{proposal.title}</Title>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text type="secondary">{t('proposal.creator')}: </Text>
            <Text copyable>{proposal.creator}</Text>
          </div>

          <Paragraph>{proposal.description}</Paragraph>

          <div className={styles.votingStats}>
            <Row gutter={16}>
              <Col span={12}>
                <Card className={styles.statsCard}>
                  <Statistic
                    title={t('proposal.votesFor')}
                    value={formatTokenAmount(proposal.votesFor, 'Votes')}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className={styles.statsCard}>
                  <Statistic
                    title={t('proposal.votesAgainst')}
                    value={formatTokenAmount(proposal.votesAgainst, 'Votes')}
                  />
                </Card>
              </Col>
            </Row>
          </div>

          <div className={styles.progressBar}>
            <Progress
              percent={votesForPercentage}
              status={proposal.executed ? 'success' : 'active'}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          </div>

          <div className={styles.votingPower}>
            <Text>{t('proposal.yourVotingPower')}: {formatTokenAmount(userVotingPower, 'Votes')}</Text>
          </div>

          {isActive && !proposal.executed && (
            <div className={styles.votingButtons}>
              <Space size="large">
                <Button
                  type="primary"
                  onClick={() => handleVote(true)}
                  loading={voting}
                  disabled={Number(userVotingPower) === 0}
                >
                  {t('proposal.voteFor')}
                </Button>
                <Button
                  danger
                  onClick={() => handleVote(false)}
                  loading={voting}
                  disabled={Number(userVotingPower) === 0}
                >
                  {t('proposal.voteAgainst')}
                </Button>
              </Space>
            </div>
          )}

          <div className={styles.deadline}>
            <Text type="secondary">
              {isActive
                ? t('proposal.endsIn', { date: formatDate(proposal.deadline * 1000) })
                : t('proposal.ended')}
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}; 