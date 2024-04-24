import React from 'react';
import { render } from '@testing-library/react';
import CustomTitle from '../components/CustomTitle';

test('renders CustomTitle component with correct styling', () => {
  const { getByText } = render(<CustomTitle />);

  // Assert that the title text is rendered
  const titleText = getByText('Steam Guru');
  expect(titleText).toBeInTheDocument();

  // Assert that the title is centered and white-colored
  const titleContainer = titleText.parentElement;
  expect(titleContainer).toHaveStyle({
    textAlign: 'center',
    color: 'white'
  });

  // Assert that the title font size is 5em
  const titleHeading = titleText.closest('h1');
  expect(titleHeading).toHaveStyle({
    fontSize: '5em'
  });
});
