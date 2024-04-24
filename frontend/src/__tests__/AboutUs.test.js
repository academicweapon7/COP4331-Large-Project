import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from '../components/AboutUs'; // Adjust import path

test('renders AboutUs component with correct data', () => {
  const { getAllByAltText, getAllByText } = render(<AboutUs />);

  // Assert that the correct number of images are rendered
  const images = getAllByAltText(/Adriel|Alyssa|Gabe|Lenny|Logan|Matt/i);
  expect(images).toHaveLength(6);

  // Assert that the correct captions are rendered
  const captions = getAllByText(/Adriel|Alyssa|Gabe|Lenny|Logan|Matt/i);
  expect(captions).toHaveLength(6);
});
