import './styles.css'

export const SearchInput = ({ value, event }) => { 
    return(
        <input 
        className='search-input'
        placeholder='Faça sua busca'
        type='search'
        value={value}
        onChange={event}
        />
    );
}