import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Web3 from 'web3';
import styles from '../../styles/components/Voting.module.css';

interface ProposalFormProps {
  account: string;
  web3: Web3 | null;
  onClose: () => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ account, web3, onClose }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!web3 || !account || !title || !description || !deadline) return;

    setLoading(true);
    try {
      const votingContract = new web3.eth.Contract(
        // Add your voting contract ABI here
        [],
        process.env.REACT_APP_VOTING_CONTRACT_ADDRESS
      );

      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
      await votingContract.methods
        .createProposal(title, description, deadlineTimestamp)
        .send({ from: account });

      onClose();
    } catch (error) {
      console.error('Error creating proposal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.proposalFormOverlay}>
      <div className={styles.proposalForm}>
        <h2 className={styles.formTitle}>{t('voting.createProposal')}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">{t('voting.proposalTitle')}</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('voting.enterTitle')}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">{t('voting.proposalDescription')}</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('voting.enterDescription')}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="deadline">{t('voting.proposalDeadline')}</label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || !title || !description || !deadline}
            >
              {loading ? t('common.loading') : t('common.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposalForm;