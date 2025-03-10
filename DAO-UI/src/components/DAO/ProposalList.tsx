import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Web3 from 'web3';
import axios from 'axios';
import styles from '../../styles/components/Voting.module.css';

interface Proposal {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  deadline: number;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  creator: string;
}

interface ProposalListProps {
  account: string;
  web3: Web3 | null;
  onVoteSuccess: () => void;
}

const ProposalList: React.FC<ProposalListProps> = ({ account, web3, onVoteSuccess }) => {
  const { t } = useTranslation();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingLoading, setVotingLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/proposals`);
      setProposals(response.data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (proposalId: string, support: boolean) => {
    if (!web3 || !account) return;

    setVotingLoading(proposalId);
    try {
      const votingContract = new web3.eth.Contract(
        // Add your voting contract ABI here
        [],
        process.env.REACT_APP_VOTING_CONTRACT_ADDRESS
      );

      await votingContract.methods.vote(proposalId, support).send({ from: account });
      await fetchProposals();
      onVoteSuccess();
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setVotingLoading(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}>{t('common.loading')}</div>;
  }

  return (
    <div className={styles.proposalsGrid}>
      {proposals.map((proposal) => (
        <div key={proposal.id} className={styles.proposalCard}>
          <h2 className={styles.proposalTitle}>{proposal.title}</h2>
          <p className={styles.proposalDescription}>{proposal.description}</p>
          
          <div className={styles.votingStats}>
            <div className={styles.votesFor}>
              {t('voting.votesFor')}: {proposal.votesFor}
            </div>
            <div className={styles.votesAgainst}>
              {t('voting.votesAgainst')}: {proposal.votesAgainst}
            </div>
          </div>

          <div className={styles.proposalStatus}>
            <span className={styles.label}>{t('voting.status')}:</span>
            <span className={`${styles.status} ${styles[proposal.status]}`}>
              {t(`voting.status.${proposal.status}`)}
            </span>
          </div>

          {proposal.status === 'active' && account && (
            <div className={styles.votingButtons}>
              <button
                className={`${styles.voteButton} ${styles.voteFor}`}
                onClick={() => handleVote(proposal.id, true)}
                disabled={votingLoading === proposal.id}
              >
                {votingLoading === proposal.id ? t('common.loading') : t('voting.voteFor')}
              </button>
              <button
                className={`${styles.voteButton} ${styles.voteAgainst}`}
                onClick={() => handleVote(proposal.id, false)}
                disabled={votingLoading === proposal.id}
              >
                {votingLoading === proposal.id ? t('common.loading') : t('voting.voteAgainst')}
              </button>
            </div>
          )}

          <div className={styles.proposalFooter}>
            <span className={styles.deadline}>
              {t('voting.deadline')}: {new Date(proposal.deadline * 1000).toLocaleDateString()}
            </span>
            <span className={styles.creator}>
              {t('voting.creator')}: {proposal.creator}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalList;