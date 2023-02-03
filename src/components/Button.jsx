import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Button extends Component {
  render() {
    const { children, testid, actionCreator, dispatch } = this.props;
    return (
      <button
        type="button"
        onClick={ () => dispatch(actionCreator()) }
        data-testid={ testid }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actionCreator: PropTypes.func.isRequired,
  testid: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect()(Button);
