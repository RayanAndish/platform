// src/components/OpenFundingCalls/OpenFundingCalls.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  OpenFundingCallsContainer,
  OpenCallCard,
  OpenCallImage,
  OpenCallTitle,
  OpenCallSubtitle,
  OpenCallDetails,
  SeeAllLink,
} from './Styles/OpenFundingCalls.styles.ts'; // Import styles

interface OpenFundingCall {
  image: string;
  title: string;
  subtitle: string;
  deadline: string;
  funded: string;
  daysLeft: number;
}

interface OpenFundingCallsProps {
  openCalls: OpenFundingCall[];
}

const OpenFundingCalls: React.FC<OpenFundingCallsProps> = ({ openCalls }) => {
  const { t } = useTranslation();

  return (
    <OpenFundingCallsContainer>
      <h2>
        {t('openFundingCalls')} <SeeAllLink href="#">{t('seeAll')}</SeeAllLink>
      </h2>
      {openCalls.map((call, index) => (
        <OpenCallCard key={index}>
          <OpenCallImage src={call.image} alt={call.title} />
          <div>
            <OpenCallTitle>{call.title}</OpenCallTitle>
            <OpenCallSubtitle>{call.subtitle}</OpenCallSubtitle>
            <OpenCallDetails>
              <p>
                {t('deadline')}: {call.deadline}
              </p>
              <p>
                {t('funded')}: {call.funded}
              </p>
              <p>
                {call.daysLeft} {t('daysLeft')}
              </p>
            </OpenCallDetails>
          </div>
        </OpenCallCard>
      ))}
    </OpenFundingCallsContainer>
  );
};

export default OpenFundingCalls;