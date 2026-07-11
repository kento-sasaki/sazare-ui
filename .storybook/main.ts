import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    { directory: '../packages/components/src/typography', titlePrefix: 'Typography' },
    { directory: '../packages/components/src/layout', titlePrefix: 'Layout' },
    { directory: '../packages/components/src/form', titlePrefix: 'Form' },
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
