import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="Wallet">
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
