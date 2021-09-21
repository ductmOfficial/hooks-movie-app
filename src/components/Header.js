import React from 'react';

const Header = (props) => {
  return (
    <header className="App-header">
      <h2 onClick={props.onRequestPage}>{props.text}</h2>
    </header>
  );
};

export default Header;