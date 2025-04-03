import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('renders welcome message', () => {
  render(<Home />);
  const linkElement = screen.getByText(/welcome to my app/i);
  expect(linkElement).toBeInTheDocument();
});