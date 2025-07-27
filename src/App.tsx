// src/App.tsx
import React from 'react';
import  {HomePage}  from './pages/HomePage/HomePage';
import  {Header}  from './common/components/Layout/Header/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
    </>
  );
};

export default App;