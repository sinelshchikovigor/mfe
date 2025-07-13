import { SideMenu } from './components';
import React, { Suspense } from 'react';

const Dashboard = React.lazy(() => import('dashboard/Dashboard'));
const Profile = React.lazy(() => import('profile/Profile'));
const TradingPanel = React.lazy(() => import('trading/TradingPanel'));

function App() {
  return (
    <div className="flex">
      <SideMenu />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Suspense fallback={<div>Загрузка Dashboard...</div>}>
            <Dashboard />
          </Suspense>
          <Suspense fallback={<div>Загрузка Profile...</div>}>
            <Profile />
          </Suspense>
          <Suspense fallback={<div>Загрузка Trading...</div>}>
            <TradingPanel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
