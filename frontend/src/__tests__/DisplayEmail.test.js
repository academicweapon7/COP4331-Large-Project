import React from 'react';
import { render } from '@testing-library/react';
import DisplayEmail from '../components/DisplayEmail';

test('renders DisplayEmail component with correct email address and styling', () => {
  // Set the email address in localStorage
  const email = 'test@example.com';
  localStorage.setItem('userEmail', email);

  const { getByText } = render(<DisplayEmail />);

  // Assert that the email address is rendered
  const emailElement = getByText(email);
  expect(emailElement).toBeInTheDocument();

  // Assert that the email address has the correct styling
  expect(emailElement).toHaveStyle({
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '24px',
    paddingRight: '5px'
  });
});
