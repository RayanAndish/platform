// src/components/FAQ/FAQ.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FAQContainer, FAQItem, Question, Answer } from './Styles/FAQ.styles.ts';
interface FAQ {
    question: string;
    answer: string;
}
interface FAQProps {
    faqs: FAQ[];
}
const FAQ: React.FC<FAQProps> = ({ faqs }) => {
    const { t } = useTranslation();
    return (
        <FAQContainer>
            <h2>{t('frequentlyAskedQuestions')}</h2>
            {faqs.map((faq, index) => (
                <FAQItem key={index}>
                    <Question>{faq.question}</Question>
                    <Answer>{faq.answer}</Answer>
                </FAQItem>
            ))}
        </FAQContainer>
    );
};
export default FAQ;