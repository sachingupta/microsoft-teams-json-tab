import * as React from 'react';
import { Text, Input, Dropdown } from '@stardust-ui/react';
import * as microsoftTeams from '@microsoft/teams-js';
import { getSupportedCommands } from '../api/api';
import { ICommand } from '../api/api.interface';

export const SettingsView = (props: {}) => {
  // INITIAL STATES
  const iCommandList: ICommand[] = [];

  // PROCESSORS
  const processCommands = (command: ICommand) => {
    return command.title;
  };

  // STATE HOOKS
  const [CommandList, setCommandList] = React.useState(iCommandList);
  const [CommandSelected, setCommandSelected] = React.useState('');
  const [TabName, setTabName] = React.useState('JSONTabDefault');

  // HANDLERS
  const onError = (error: string): any => {
    alert(error);
  };

  const onGetCommandResponse = (response: ICommand[]): void => {
    setCommandList(response);
  };

  const handleNameChange = async (event: any) => {
    await setTabName(event.target.value);
  };

  const handleCommandChange = async (event: any, res: any) => {
    await setCommandSelected(res.value);
    microsoftTeams.settings.setValidityState(true);
  };

  // EFFECT HOOKS
  React.useEffect(() => {
    microsoftTeams.initialize();
    microsoftTeams.settings.registerOnSaveHandler(saveEvent => {
      microsoftTeams.settings.setSettings({
        entityId: 'JSONTab',
        contentUrl: `https://teams-json-tab.azurewebsites.net?theme={theme}&frameContext=content&commandId=${CommandSelected}`,
        suggestedDisplayName: TabName,
      });
      saveEvent.notifySuccess();
    });
    getSupportedCommands(onGetCommandResponse, onError);
  });

  return (
    <div>
      <Text size={'smaller'} content={'Name your tab'} />
      <Input fluid placeholder="Tab name" onChange={e => handleNameChange(e)} />
      <br />
      <Text size={'smaller'} content={"Select the command you'd like query your bot with"} />
      <Dropdown
        fluid
        items={CommandList.map(processCommands)}
        noResultsMessage="We couldn't find any matches."
        onSelectedChange={handleCommandChange}
      />
    </div>
  );
};
