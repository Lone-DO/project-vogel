import { describe, it, expect, vi, afterEach } from 'vitest'

import { mount } from '@vue/test-utils'
import App from './AppNavigation.vue'

vi.mock('vue-router', async () => {
  return {
    RouterView: {},
    useRoute: () => {
      return {
        params: {},
      }
    },
  }
})

describe('AppNavigation', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper).toBeTruthy()
  })
})
