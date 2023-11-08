import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        
      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        

      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        
      </nav>
    );
  }
}

export default Header;
