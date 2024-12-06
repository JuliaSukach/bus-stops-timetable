import { config } from '@vue/test-utils';

// Mock global variables like $t for i18n if needed
config.global.mocks = {
  $t: (msg: string) => msg,
}
