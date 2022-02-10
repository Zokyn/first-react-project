import P from 'prop-types';
import './styles.css';
import { PostContent } from '../PostContent';
import { React } from 'react';

export const PostsContainer = ({ posts = [] }) => (
  <div className="post-container">
    {posts.map((post) => (
      <PostContent key={post.id} cover={post.cover} title={post.title} body={post.body} id={post.id} />
    ))}
  </div>
);

PostsContainer.defaultProps = {
  posts: [],
};

PostsContainer.propTypes = {
  posts: P.array,
};
