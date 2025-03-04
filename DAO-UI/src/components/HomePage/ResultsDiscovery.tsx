// src/components/ResultsDiscovery/ResultsDiscovery.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResultsDiscoveryContainer, ResultCard, ResultImage, ResultTitle, ResultSubtitle, SeeAllLink } from './Styles/ResultsDiscovery.styles.ts';

interface Result {
    image: string;
    title: string;
    subtitle: string;
}

interface ResultsDiscoveryProps {
    results: Result[];
}

const ResultsDiscovery: React.FC<ResultsDiscoveryProps> = ({ results }) => {
    const { t } = useTranslation();

    return (
        <ResultsDiscoveryContainer>
            <h2>
                {t('resultsDiscovery')} <SeeAllLink href="#">{t('seeAll')}</SeeAllLink>
            </h2>
            {results.map((result, index) => (
                <ResultCard key={index}>
                    <ResultImage src={result.image} alt={result.title} />
                    <div>
                        <ResultTitle>{result.title}</ResultTitle>
                        <ResultSubtitle>{result.subtitle}</ResultSubtitle>
                    </div>
                </ResultCard>
            ))}
        </ResultsDiscoveryContainer>
    );
};

export default ResultsDiscovery;