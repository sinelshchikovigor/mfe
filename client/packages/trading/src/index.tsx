import { createRoot } from 'react-dom/client';
import TradingPanel from './TradingPanel';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(<TradingPanel />);
