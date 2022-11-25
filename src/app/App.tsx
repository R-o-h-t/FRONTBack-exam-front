/* eslint-disable react/react-in-jsx-scope */
import './app.scss';
import AppRouter from './AppRouter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppContextProvider } from './context/AppContext';

export default function App() {
  return (
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  );
}
