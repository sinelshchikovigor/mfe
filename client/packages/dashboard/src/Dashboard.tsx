function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Дашборд</h1>
      <div className="bg-white rounded shadow p-4">
        <p>
          Баланс: <span className="font-mono">1.234 BTC</span>
        </p>
        <p>
          Общая стоимость: <span className="font-mono">$42,000</span>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
