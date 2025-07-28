import React from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { Header } from './common/components/Layout/Header/Header';
import { ThemeProvider } from './contexts/ThemeProvider'; 


const App: React.FC = () => {
  return (
    
    <ThemeProvider>
      <>
        <Header />
        <main>
          <HomePage />
        </main>
      </>
    </ThemeProvider>
  );
};

export default App;
