import { render, screen } from '@testing-library/react';
import { PostContent } from '.';

const props = {
  title: 'title',
  body: 'body',
  id: 'id',
  cover: 'img/img.png',
};

describe('<PostContent />', () => {
  it('should render PostContent correctly', () => {
    render(<PostContent {...props} />);

    expect(screen.getByRole('img', { name: 'title' })).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: 'title' })).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });
});
