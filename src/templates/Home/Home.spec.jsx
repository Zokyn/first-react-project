import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: '1',
          title: 'title 1',
          body: 'body 1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: '2',
          title: 'title 2',
          body: 'body 2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: '3',
          title: 'title 3',
          body: 'body 3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Post com titulo não encontrado.');

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/faça sua busca/i);
    expect(search).toBeInTheDocument();

    const titles = screen.getAllByText(/title/i);
    expect(titles).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();

    expect.assertions(3);
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Post com titulo não encontrado.');

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/faça sua busca/i);
    // Initial test - displaying initial posts of first page
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    // Search test - displaying only Posts with search mating
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

    userEvent.clear(search);
    // Clear test - displaying initial posts again
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

    userEvent.type(search, 'post do not exists');
    // Not found test - displaying only error message
    expect(screen.getByText('Post com titulo não encontrado.')).toBeInTheDocument();

    expect.assertions(10);
  });

  it('should button works', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Post com titulo não encontrado.');

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
