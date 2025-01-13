import type { MainAndSupportColors as BaseCustomColors } from '@digdir/designsystemet-react/colors';

declare module '@digdir/designsystemet-react/colors' {
  export interface MainAndSupportColors extends BaseCustomColors {
    granskog: never;
    5: never;
    border-radius: never;
  }
}
