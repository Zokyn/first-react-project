import { PostContent } from "../PostContent"
import "./styles.css"

export const PostsContainer = ({ posts }) => (
    <div className="post-container">
        {posts.map(post => (
            <PostContent 
                key={post.id}
                cover={post.cover}
                title={post.title}
                body={post.body}
                id={post.id}
            />
        ))}
    </div>
);