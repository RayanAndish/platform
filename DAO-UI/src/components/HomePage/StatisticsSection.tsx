// src/components/HomePage/StatisticsSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledStatisticsSection, Statistic, StatisticValue, StatisticLabel } from './styles.ts';

interface StatisticsProps {
  listedProjects: number;
  fundedProjects: number;
  researchers: number;
}

const StatisticsSection: React.FC<StatisticsProps> = ({ listedProjects, fundedProjects, researchers }) => {
  const { t, i18n } = useTranslation();
    return (
      <StyledStatisticsSection>
        <Statistic>
          <StatisticValue>{listedProjects}</StatisticValue>
          <StatisticLabel>{t('Listed Projects')}</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{fundedProjects}</StatisticValue>
          <StatisticLabel>{t('Funded Projects')}</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{researchers}</StatisticValue>
          <StatisticLabel>{t('Researchers')}</StatisticLabel>
        </Statistic>
      </StyledStatisticsSection>
    );
};

export default StatisticsSection;