import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';

test('renders Login component with form fields', () => {
  const { getByPlaceholderText, getByText } = render(<Login />);
  
  // Assert that input fields and button are rendered
  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');
  const forgotPasswordLink = getByText('Forgot Password?');
  
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(forgotPasswordLink).toBeInTheDocument();
});

test('form submission and validation', async () => {
  const { getByPlaceholderText, getByText } = render(<Login />);
  
  // Fill in form fields
  fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'Test@123' } });
  
  // Mock fetch to return a successful response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () =>
        Promise.resolve(
          JSON.stringify({
            id: '123',
            login: 'testuser',
            email: 'test@example.com',
            verified: true,
          })
        ),
    })
  );
  
  // Submit form
  fireEvent.click(getByText('Login'));
  
  // Assert that the form is submitted and local storage is updated
  await waitFor(() => {
    expect(localStorage.getItem('userId')).toBe('123');
    expect(localStorage.getItem('userLogin')).toBe('testuser');
    expect(localStorage.getItem('userEmail')).toBe('test@example.com');
  });
});
