import type { StorybookConfig } from '@storybook/react-vite'
import tsconfigPaths from 'vite-plugin-tsconfig-paths'

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../components/**/*.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        tsconfigPaths(),
      ],
    }
  },
}

export default config