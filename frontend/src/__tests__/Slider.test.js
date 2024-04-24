import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Slider from '../components/Slider';

test('renders Slider component with buttons', () => {
  // Mock handleToggleForm function
  const mockHandleToggleForm = jest.fn();

  // Render the Slider component
  const { getByText } = render(
    <Slider showLogin={true} handleToggleForm={mockHandleToggleForm} />
  );

  // Assert that the buttons are rendered
  const loginButton = getByText('Login');
  const registerButton = getByText('Register');
  expect(loginButton).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});

test('calls handleToggleForm with correct argument when buttons are clicked', () => {
  // Mock handleToggleForm function
  const mockHandleToggleForm = jest.fn();

  // Render the Slider component
  const { getByText } = render(
    <Slider showLogin={true} handleToggleForm={mockHandleToggleForm} />
  );

  // Click the Register button
  const registerButton = getByText('Register');
  fireEvent.click(registerButton);
  
  // Check if handleToggleForm is called with the correct argument
  expect(mockHandleToggleForm).toHaveBeenCalledWith('register');
});
