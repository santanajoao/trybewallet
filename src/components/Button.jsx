import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { children, testid, onClick } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        data-testid={ testid }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  testid: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
