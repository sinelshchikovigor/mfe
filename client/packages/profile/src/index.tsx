import { createRoot } from 'react-dom/client';
import Profile from './Profile';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(<Profile />);
