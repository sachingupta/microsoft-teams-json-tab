import React from 'react';
import './css/App.css';

import { getFrameContext } from './utils/utils';
import { SettingsView } from './components/SettingsView';
import { ContentViewWrapper } from './components/ContentView';

interface IAppProps {
  onThemeChange: (theme: string) => void;
}

export const App: React.FC<IAppProps> = (props: IAppProps): JSX.Element => {
  // CONSTANTS
  const url: string = window.location.href;
  const frameContext = getFrameContext(url);
  if (frameContext === 'settings') {
    return (
      <div>
        <SettingsView />
      </div>
    );
  } else {
    return <ContentViewWrapper onThemeChange={props.onThemeChange} />;
  }
};
export default App;
