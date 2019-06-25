import React from 'react';
import { Provider } from '@stardust-ui/react';
import App from './App';
import * as themeUtils from './utils/themeUtils';

export const ProviderWrapper: React.FC = (): JSX.Element => {
  // CONSTANT
  const initialTheme = themeUtils.getTheme(themeUtils.getThemeFromURL(window.location.href));
  // HOOKS
  const [Theme, setTheme] = React.useState(initialTheme);

  // HANDLERS
  const handleThemeChange = (theme: string): void => {
    setTheme(themeUtils.getTheme(theme));
  };

  return (
    <Provider theme={Theme}>
      <App onThemeChange={handleThemeChange} />
    </Provider>
  );
};
