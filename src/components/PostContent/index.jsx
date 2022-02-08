import "./styles.css"

export const PostContent = ({title, cover, body, id}) => (
    <div className='post-content'>
        <img src={cover} alt={title} />
        <div className='post-card'>
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
    </div>
);