import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '.';

describe('<SearchInput />', () => {
  it('should have a value', () => {
    const fn = jest.fn();
    render(<SearchInput event={fn} value={'test'} />);

    const input = screen.getByPlaceholderText(/faça sua busca/i);
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('test');
  });
  it('should call event on each key pressed', () => {
    const fn = jest.fn();
    render(<SearchInput event={fn} value={'valor'} />);

    const input = screen.getByPlaceholderText(/faça sua busca/i);
    const value = 'valor';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
});
