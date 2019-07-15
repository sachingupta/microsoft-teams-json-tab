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

const getCustomTheme = () => ({
  componentVariables: {
    ContentViewWrapper: ({ colorScheme }: any) => ({
      backgroundColor: colorScheme.default.background2,
    }),
    ListItem: ({ colorScheme }: any) => ({
      backgroundColor: colorScheme.default.background,
    }),
    Segment: ({ colorScheme }: any) => ({
      backgroundColor: colorScheme.default.background,
      hoverBackgroundColor: colorScheme.brand.background,
      hoverTextColor: colorScheme.default.foregroundFocus3,
      activeBackgroundColor: colorScheme.brand.backgroundPressed,
      activeTextColor: colorScheme.default.foregroundFocus3,
    }),
    Input: ({ colorScheme }: any) => ({
      inputBackgroundColor: colorScheme.default.background,
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
      }),
    },
    Input: {
      input: ({ variables }: any) => ({
        backgroundColor: variables.inputBackgroundColor,
      }),
    },
    Segment: {
      root: ({ variables }: any) => ({
        ':hover': {
          backgroundColor: variables.hoverBackgroundColor,
          color: variables.hoverTextColor,
        },
        ':active': {
          backgroundColor: variables.activeBackgroundColor,
          color: variables.activeTextColor,
        },
        ':focus': {
          backgroundColor: variables.hoverBackgroundColor,
          color: variables.hoverTextColor,
        },
      }),
    },
  },
});

// gets theme type from string
export const getTheme = (theme: string): ThemeInput => {
  let customTheme: ThemeInput;
  switch (theme) {
    case themeTypes.Contrast:
      customTheme = getCustomTheme();
      return mergeThemes(themes.teamsHighContrast, customTheme);
    case themeTypes.Dark:
      customTheme = getCustomTheme();
      return mergeThemes(themes.teamsDark, customTheme);
    default:
      customTheme = getCustomTheme();
      return mergeThemes(themes.teams, customTheme);
  }
};
