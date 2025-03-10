import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Web3 from 'web3';
import ProposalList from './ProposalList';
import ProposalForm from './ProposalForm';
import { VotingContract } from '../../types/web3';
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

const VotingPage: React.FC = () => {
  const { t } = useTranslation();
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');
  const [votingPower, setVotingPower] = useState<string>('0');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum) {
          const web3Instance = new Web3(ethereum);
          setWeb3(web3Instance);
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            await fetchVotingPower(web3Instance, accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error initializing web3:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const fetchVotingPower = async (web3Instance: Web3, userAccount: string) => {
    try {
      const votingContract = new web3Instance.eth.Contract(
        // Add your voting contract ABI here
        [],
        process.env.REACT_APP_VOTING_CONTRACT_ADDRESS
      ) as unknown as VotingContract;

      const power = await votingContract.methods.getVotingPower(userAccount).call();
      setVotingPower(web3Instance.utils.fromWei(power, 'ether'));
    } catch (error) {
      console.error('Error fetching voting power:', error);
    }
  };

  const handleCreateProposal = () => {
    setShowProposalForm(true);
  };

  if (loading) {
    return <div className={styles.loading}>{t('common.loading')}</div>;
  }

  return (
    <div className={styles.votingContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('voting.title')}</h1>
        <div className={styles.votingPower}>
          {t('voting.votingPower')}: {votingPower} tokens
        </div>
        <button
          className={styles.createButton}
          onClick={handleCreateProposal}
          disabled={!account}
        >
          {t('voting.createProposal')}
        </button>
      </div>

      {showProposalForm && (
        <ProposalForm
          onClose={() => setShowProposalForm(false)}
          account={account}
          web3={web3}
        />
      )}

      <ProposalList
        account={account}
        web3={web3}
        onVoteSuccess={() => fetchVotingPower(web3!, account)}
      />
    </div>
  );
};

export default VotingPage;