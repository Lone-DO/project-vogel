import { RouterLinkStub, config } from '@vue/test-utils'

config.global.stubs = {
  RouterLink: RouterLinkStub,
  RouterView: {
    template: '<span />',
  },
}
