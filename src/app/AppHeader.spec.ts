import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from './AppHeader.vue'

describe('AppHeader', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Vögel')
  })
})
