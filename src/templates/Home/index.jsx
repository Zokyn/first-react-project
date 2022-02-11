import { useState, useEffect, useCallback, React } from 'react';

import './styles.css';

import { loadContent } from '../../utils/loadContent';
import { NextButton } from '../../components/NextButton';
import { PostsContainer } from '../../components/PostsContainer';
import { SearchInput } from '../../components/SearchInput';
// Componente de Classe
export const Home = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [postsPerPage] = useState(2);

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const searchedPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const loadInitialPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadContent();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  useEffect(() => {
    loadInitialPosts(0, postsPerPage);
  }, [loadInitialPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        <SearchInput value={searchValue} event={handleChange} />
        {/* {!!searchValue && <h3>{searchValue}</h3>} */}
      </div>

      <div>
        {searchedPosts.length > 0 && <PostsContainer posts={searchedPosts} />}
        {searchedPosts.length <= 0 && <p>Post com titulo não encontrado.</p>}
      </div>

      <div className="button-container">
        {!searchValue && <NextButton text="Load more posts" onClick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
};
