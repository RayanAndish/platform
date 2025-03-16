import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, List } from 'antd';
import styles from '../../styles/components/VotingPage.module.css';

const VotingPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t('voting.title')}</h1>
      <Card>
        <List>
          {/* Voting content */}
        </List>
      </Card>
    </div>
  );
};

export default VotingPage;