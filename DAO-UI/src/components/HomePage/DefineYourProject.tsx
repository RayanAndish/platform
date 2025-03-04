// src/components/HomePage/DefineYourProject.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DefineYourProjectContainer, Title, Subtitle, Button, Image } from './styles.ts';

const DefineYourProject: React.FC = () => {
  const { t } = useTranslation();
  return (
    <DefineYourProjectContainer>
        <Image src="/path/to/image.png" alt="Define your project" />
        <Title>{t('defineYourProjectTitle')}</Title>
        <Subtitle>{t('defineYourProjectSubtitle')}</Subtitle>
        <Button primary>{t('defineYourProjectButton')}</Button>
    </DefineYourProjectContainer>
  );
};

export { DefineYourProject };