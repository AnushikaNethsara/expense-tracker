import { render, screen } from '@testing-library/react';
import App from './App';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
