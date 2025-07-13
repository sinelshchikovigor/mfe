import React, { Suspense } from 'react';

const Dashboard = React.lazy(() => import('dashboard/Dashboard'));
const Profile = React.lazy(() => import('profile/Profile'));
const TradingPanel = React.lazy(() => import('trading/TradingPanel'));

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">App Example</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

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
  );
}

export default App;
