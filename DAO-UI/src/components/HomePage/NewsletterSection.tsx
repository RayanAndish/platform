// src/components/HomePage/NewsletterSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { StyledNewsletterSection, Title, Form, Input, Button } from './Styles/NewsletterSection.styles.ts';

const NewsletterSection: React.FC = () => {
  const { t, i18n } = useTranslation();
    return (
      <StyledNewsletterSection>
        <Title>SUBSCRIBE TO OUR NEWSLETTER</Title>
        <p>Get weekly access to the last listed projects, available grants and programs</p>
        <Form>
          <Input type="email" placeholder="Enter you email" />
          <Button primary>t{('Subscribe')}</Button>
        </Form>
      </StyledNewsletterSection>
    );
};

export default NewsletterSection;