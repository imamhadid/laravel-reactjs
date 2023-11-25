import React from 'react';
import './App.css';
import AppRouter from './Routes/AppRouters';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AppRouter />
      </header>
    </div>
  );
}

export default App;
