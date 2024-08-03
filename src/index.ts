import { createRoot } from 'react-dom/client';
import App from './App.js';

const div = document.createElement('div');
div.id = 'app';
document.body.appendChild(div);
const root = createRoot(div);
root.render(App());
