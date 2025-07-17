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
    <div className="min-h-screen bg-[#181f2a] text-white">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <main className="flex-1 p-8 bg-black text-white" style={{ color: 'white', paddingLeft: '10px', paddingRight: '10px' }}>
          {selectedTab === null && <MainPage />}
          {selectedTab === 0 && <CustomerInfo />}
          {selectedTab === 1 && <ProductDetails />}
        </main>
      </div>
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
