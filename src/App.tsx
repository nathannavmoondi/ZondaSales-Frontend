import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ZondaSalesProvider, useZondaSales } from './context/ZondaSalesContext';
import CustomerInfo from './components/CustomerInfo';
import ProductDetails from './components/ProductDetails';
import MainPage from './components/MainPage';
import { useState } from 'react';

function AppContent() {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-[#181f2a] text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        <Sidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <main className="flex-1 p-8 bg-black text-white" style={{ color: 'white', paddingLeft: '10px', paddingRight: '10px' }}>
          {selectedTab === null && <MainPage />}
          {selectedTab === 0 && <CustomerInfo />}
          {selectedTab === 1 && <ProductDetails />}
        </main>
      </div>
      <footer style={{ background: '#1565c0', color: 'white', textAlign: 'center', padding: '16px 0', marginTop: 'auto' }}>
        &copy; 2025 Nathan Moondi and Happy Dappy Technologies
      </footer>
    </div>
  );
}

function App() {
  return (
    <ZondaSalesProvider>
      <AppContent />
    </ZondaSalesProvider>
  );
}

export default App;
