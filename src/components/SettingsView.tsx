import * as React from 'react';
import { Text, Input, Dropdown } from '@stardust-ui/react';
import * as microsoftTeams from '@microsoft/teams-js';
import { getSupportedCommands } from '../api/api';

export const SettingsView: React.FC = (): JSX.Element => {
  // STATE HOOKS
  const [CommandList, setCommandList] = React.useState([] as microsoftTeams.bot.Command[]);
  const [ContentUrl, setContentUrl] = React.useState('');
  const [TabName, setTabName] = React.useState('JSONTabDefault');
  // HANDLERS
  const onError = (error: string): void => {
    alert(error);
  };

  const onGetCommandResponse = (response: microsoftTeams.bot.Command[]): void => {
    setCommandList(response);
    if (CommandList.length === 1) {
      onCommandSelection(findCommand(CommandList[0].title));
    }
    microsoftTeams.appInitialization.notifySuccess();
  };

  const handleNameChange = (event: any): void => {
    setTabName(event.target.value);
  };

  const handleCommandChange = (event: any, res: any): void => {
    const command = findCommand(res.value);
    if (command) {
      onCommandSelection(command);
    }
  };

  const findCommand = (title: string): microsoftTeams.bot.Command => {
    const command = CommandList.find(
      (item: microsoftTeams.bot.Command): boolean => item.title === title,
    ) as microsoftTeams.bot.Command;
    return command;
  };

  const onCommandSelection = (command: microsoftTeams.bot.Command): void => {
    modifyUrlIfInitial(command);
    microsoftTeams.settings.setValidityState(true);
  };

  const modifyUrlIfInitial = (command: microsoftTeams.bot.Command): void => {
    if (command.initialRun) {
      setContentUrl(
        `https://microsoft-teams-json-tab.azurewebsites.net?theme={theme}&frameContext=content&commandId=${command.id}&initialRun=${command.initialRun}`,
      );
    } else {
      setContentUrl(
        `https://microsoft-teams-json-tab.azurewebsites.net?theme={theme}&frameContext=content&commandId=${command.id}`,
      );
    }
  };

  const saveHandler = (saveEvent: microsoftTeams.settings.SaveEvent): void => {
    microsoftTeams.settings.setSettings({
      entityId: 'JSONTab',
      contentUrl: ContentUrl,
      suggestedDisplayName: TabName,
    });
    saveEvent.notifySuccess();
  };

  // EFFECT HOOKS
  React.useEffect((): void => {
    microsoftTeams.initialize();
    microsoftTeams.appInitialization.notifyAppLoaded();
    microsoftTeams.settings.registerOnSaveHandler(saveHandler);
    getSupportedCommands(onGetCommandResponse, onError);
  });

  return (
    <div>
      <div>
        <Text size={'medium'} content={'Name your tab'} />
      </div>
      <Input fluid placeholder={'Tab name'} onChange={handleNameChange} />
      <div style={{ marginTop: '16px' }}>
        <Text size={'medium'} content={"Select the command you'd like query your bot with"} />
      </div>
      <Dropdown
        fluid
        items={CommandList.map((command: microsoftTeams.bot.Command): string => {
          return command.title;
        })}
        noResultsMessage="We couldn't find any matches."
        onSelectedChange={handleCommandChange}
        placeholder={CommandList.length === 1 ? CommandList[0].title : 'Select the command'}
      />
    </div>
  );
};
