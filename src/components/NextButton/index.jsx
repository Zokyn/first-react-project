import P from 'prop-types';
import './styles.css';
import { Component, React } from 'react';

export class NextButton extends Component {
  render() {
    const { text, onClick, disabled = false } = this.props;

    return (
      <button disabled={disabled} onClick={onClick} className="button">
        {text}
      </button>
    );
  }
}

NextButton.defaultProps = {
  disabled: false,
};

NextButton.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
