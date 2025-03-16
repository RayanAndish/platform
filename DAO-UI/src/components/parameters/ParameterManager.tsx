import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { ContractParameters, helpers } from '@core/types/ContractParameters';
import { Box, Tabs, Tab, Typography, Button, Alert } from '@mui/material';
import TokenParameters from './TokenParameters';
import StakingParameters from './StakingParameters';
import VotingParameters from './VotingParameters';
import FinanceParameters from './FinanceParameters';
import DAOParameters from './DAOParameters';
import ProjectParameters from './ProjectParameters';
import ConsensusParameters from './ConsensusParameters';

interface Props {
  contractAddress: string;
}

export const ParameterManager: React.FC<Props> = ({ contractAddress }) => {
  const { library, account } = useWeb3React();
  const [parameters, setParameters] = useState<ContractParameters | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  // بارگذاری پارامترها
  useEffect(() => {
    const loadParameters = async () => {
      try {
        const response = await fetch('/api/parameters');
        const data = await response.json();
        setParameters(data);
        
        // بررسی دسترسی ادمین
        if (account && library) {
          const contract = new ethers.Contract(contractAddress, ['function owner() view returns (address)'], library);
          const owner = await contract.owner();
          setIsAdmin(owner.toLowerCase() === account.toLowerCase());
        }
      } catch (err) {
        setError('خطا در بارگذاری پارامترها');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadParameters();
  }, [contractAddress, account, library]);

  // به‌روزرسانی پارامترها
  const handleUpdate = async (section: keyof ContractParameters, newParams: any) => {
    try {
      setError(null);
      
      const response = await fetch('/api/parameters', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          params: newParams,
        }),
      });

      if (!response.ok) {
        throw new Error('خطا در به‌روزرسانی پارامترها');
      }

      // به‌روزرسانی state
      setParameters(prev => prev ? {
        ...prev,
        [section]: newParams
      } : null);

    } catch (err) {
      setError('خطا در به‌روزرسانی پارامترها');
      console.error(err);
    }
  };

  if (loading) {
    return <Box>در حال بارگذاری...</Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!parameters) {
    return <Alert severity="warning">پارامتری یافت نشد</Alert>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        مدیریت پارامترها
      </Typography>

      {!isAdmin && (
        <Alert severity="info" sx={{ mb: 2 }}>
          شما فقط می‌توانید پارامترها را مشاهده کنید. برای تغییر پارامترها به دسترسی ادمین نیاز دارید.
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="توکن" />
        <Tab label="استیکینگ" />
        <Tab label="رأی‌گیری" />
        <Tab label="مالی" />
        <Tab label="DAO" />
        <Tab label="پروژه" />
        <Tab label="اجماع" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <TokenParameters
            params={parameters.token}
            onUpdate={newParams => handleUpdate('token', newParams)}
            isAdmin={isAdmin}
          />
        )}
        {activeTab === 1 && (
          <StakingParameters
            params={parameters.staking}
            onUpdate={newParams => handleUpdate('staking', newParams)}
            isAdmin={isAdmin}
          />
        )}
        {activeTab === 2 && (
          <VotingParameters
            params={parameters.voting}
            onUpdate={newParams => handleUpdate('voting', newParams)}
            isAdmin={isAdmin}
          />
        )}
        {activeTab === 3 && (
          <FinanceParameters
            params={parameters.finance}
            onUpdate={newParams => handleUpdate('finance', newParams)}
            isAdmin={isAdmin}
          />
        )}
        {activeTab === 4 && (
          <DAOParameters
            params={parameters.dao}
            onUpdate={newParams => handleUpdate('dao', newParams)}
            isAdmin={isAdmin}
          />
        )}
        {activeTab === 5 && (
          <ProjectParameters
            params={parameters.project}
            onUpdate={newParams => handleUpdate('project', newParams)}
            isAdmin={isAdmin}
          />
        )}
        {activeTab === 6 && (
          <ConsensusParameters
            params={parameters.consensus}
            onUpdate={newParams => handleUpdate('consensus', newParams)}
            isAdmin={isAdmin}
          />
        )}
      </Box>
    </Box>
  );
}; 