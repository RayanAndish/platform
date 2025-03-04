// src/components/HeroSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from './HomePage/HeroSection.tsx';

test('renders hero section with title', () => {
  render(<HeroSection />);
  const titleElement = screen.getByText(/NFT-Fundraising For/i); // You may need to adjust the regex
  expect(titleElement).toBeInTheDocument();
});