import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextButton } from '.';

describe('<Button />', () => {
  it('should render the button with the text "Load more posts"', () => {
    const fn = jest.fn();
    render(<NextButton text="Load more posts" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(button).toHaveAttribute('class', 'button');
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<NextButton text="Load more posts" onClick={fn} />);

    userEvent.click(screen.getByRole('button', { name: /load more posts/i }));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<NextButton text="Load more posts" onClick={fn} disabled={false} />);

    expect(screen.getByRole('button', { name: /load more posts/i })).toBeEnabled();
  });
});
