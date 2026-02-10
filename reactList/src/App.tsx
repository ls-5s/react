import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default App;

