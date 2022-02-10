import P from 'prop-types';
import './styles.css';
import { React } from 'react';

export const SearchInput = ({ value, event }) => {
  return <input className="search-input" placeholder="Faça sua busca" type="search" value={value} onChange={event} />;
};

SearchInput.propTypes = {
  value: P.string.isRequired,
  event: P.func.isRequired,
};
