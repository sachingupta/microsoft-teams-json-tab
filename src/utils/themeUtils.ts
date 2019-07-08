import { themes, ThemeInput, mergeThemes } from '@stardust-ui/react';
import * as queryString from 'query-string';

enum themeTypes {
  Dark = 'dark',
  Default = 'default',
  Contrast = 'contrast',
}

// gets theme name from url params
export const getThemeFromURL = (iUrl: string): string => {
  const url = queryString.parseUrl(iUrl);

  const themeString: string = url.query.theme as string;

  if (!themeString) {
    return 'default';
  }
  return themeString;
};

// gets theme type from string
export const getTheme = (theme: string): ThemeInput => {
  const customTheme: ThemeInput = {
    componentVariables: {
      ContentViewWrapper: ({ colorScheme }: any) => {
        console.log(colorScheme);
        return {
          backgroundColor: colorScheme.default.background2,
        };
      },
      ListItem: ({ colorScheme }: any) => ({
        backgroundColor: colorScheme.default.background,
      }),
    },
    componentStyles: {
      ContentViewWrapper: {
        root: ({ variables }: any) => ({
          backgroundColor: variables.backgroundColor,
        }),
      },
      ListItem: {
        root: ({ variables }: any) => ({
          backgroundColor: variables.backgroundColor,
          margin: '2px 2px 0 0',
        }),
      },
    },
  };

  const newTheme: ThemeInput = mergeThemes(themes.teams, customTheme);

  switch (theme) {
    case themeTypes.Contrast:
      return themes.teamsHighContrast;
    case themeTypes.Dark:
      return themes.teamsDark;
  }

  return newTheme;
};
