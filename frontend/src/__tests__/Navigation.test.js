import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';

test('renders Navigation component with correct navigation links', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Navigation />
    </MemoryRouter>
  );
  
  // Assert that navigation links are rendered
  const homeLink = getByText('Home');
  const aboutUsLink = getByText('About Us');
  
  expect(homeLink).toBeInTheDocument();
  expect(aboutUsLink).toBeInTheDocument();
});
