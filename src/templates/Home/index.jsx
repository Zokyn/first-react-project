import { Component } from 'react';

import './styles.css';

import { loadContent } from '../../utils/loadContent' 
import { NextButton } from '../../components/NextButton'
import { PostsContainer } from '../../components/PostsContainer'
import { SearchInput } from '../../components/SearchInput';
// Componente de Classe
export class Home extends Component {
    state = {
        page: 0,
        posts: [],
        allPosts: [],
        postsPerPage: 8,
        searchValue: '',
    };
    //Essa função é ativada quando o componente é construído
    async componentDidMount() {
        await this.loadInitialPosts();
    }

    loadInitialPosts = async () => {
        const { page, postsPerPage } = this.state;

        const postsAndPhotos = await loadContent();
        this.setState({ 
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos, 
        });
    }

    loadMorePosts = () => {
        const { 
            page, 
            posts,
            postsPerPage,
            allPosts,
        } = this.state;
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

        posts.push(...nextPosts);
        this.setState({ posts, page: nextPage });
    }
    
    handleChange = (e) => {
        const { value } = e.target;

        this.setState({searchValue: value});
    }

    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
        const noMorePosts = page + postsPerPage >= allPosts.length;

        const searchedPosts = !!searchValue ? 
            allPosts.filter(post => {
                return post.title.toLowerCase().includes(
                    searchValue.toLowerCase()
                );
            }) : posts;

        return (
            <section className='container'>
                <div className='search-container'>   
                    <SearchInput
                        value={searchValue}
                        event={this.handleChange}
                        />
                        {!!searchValue && (
                            <h3>{searchValue}</h3>
                        )}
                </div>
                
                <div>
                    {searchedPosts.length > 0 && (
                        <PostsContainer posts={searchedPosts}/>
                    )}
                    {searchedPosts.length <= 0 && (
                        <p>Post com titulo não encontrado.</p>
                    )}
                </div>

                <div className='button-container'>
                    {!searchValue && (
                        <NextButton 
                            text='Load more posts'
                            onClick={this.loadMorePosts}
                            disabled={noMorePosts}
                        />
                    )}
                </div>
            </section>
            
        )
    }
}