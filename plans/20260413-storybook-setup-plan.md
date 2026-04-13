# Storybook Setup Plan for Next.js 16.2.3 + React 19 + Tailwind CSS v4 + shadcn/ui

## Overview

This plan outlines the steps to integrate Storybook 9.x with a Next.js 16.2.3 project using React 19, Tailwind CSS v4 (CSS-based configuration), and shadcn/ui components built on Base UI.

## Key Findings from Research

### 1. Storybook Version Compatibility
- **Storybook 9.x** is required for Next.js 16.x and React 19 support
- Storybook merged Next.js 16 support in [PR #32791](https://github.com/storybookjs/storybook/pull/32791) (October 2025)
- SWC loader for Next.js 16.2 support was added in [PR #34046](https://github.com/storybookjs/storybook/pull/34046) (March 2026)
- Current stable Storybook versions support Next.js 16 and React 19

### 2. Framework Choice: @storybook/nextjs vs @storybook/react-vite

**Recommendation: Use `@storybook/nextjs`**

Rationale:
- Official Next.js framework from Storybook team
- Automatically handles Next.js-specific features (routing, image optimization, absolute imports)
- Supports both Webpack (default) and Vite builders
- Better integration with Next.js 16's App Router and Turbopack
- Works with SWC compilation

While `@storybook/react-vite` is lighter, `@storybook/nextjs` provides:
- Automatic Next.js config mirroring
- Built-in routing stubbing
- Image component support
- Better App Router compatibility

### 3. Tailwind CSS v4 Configuration

Tailwind v4 uses CSS-based configuration via `@theme` directive instead of `tailwind.config.js`. Key considerations:

- **Storybook 9.x + Tailwind v4 + Vite**: Requires `@tailwindcss/vite` plugin
- **Storybook 9.x + Tailwind v4 + Webpack**: Requires `@tailwindcss/postcss` with PostCSS loader
- The project uses Tailwind v4 with `@tailwindcss/postcss` (based on postcss.config.mjs and package.json)

**Critical Issue**: There is a known incompatibility between `@tailwindcss/vite` and Storybook's Vite server (see [Tailwind Discussion #16451](https://github.com/tailwindlabs/tailwindcss/discussions/16451)). The workaround using dynamic import of `@tailwindcss/vite` in `viteFinal` works but is fragile.

**Alternative**: Use PostCSS-based approach which is more stable with Storybook.

### 4. shadcn/ui Configuration

The project uses:
- Base UI (`@base-ui/react`) instead of Radix UI directly
- Custom `cn()` utility in `lib/utils.ts` using `clsx` + `tailwind-merge`
- CSS variables for theming defined in `app/globals.css`
- Custom variant syntax (`@custom-variant dark (&:is(.dark *))`)

## Architecture

```
Next.js 16.2.3 + React 19
├── @storybook/nextjs (framework)
│   └── Uses Webpack 5 builder (default, more stable than Vite)
├── Tailwind CSS v4
│   └── Via PostCSS (@tailwindcss/postcss)
└── shadcn/ui components
    └── Built on @base-ui/react
    └── Uses cn() utility
    └── CSS variable theming
```

## Implementation Steps

### Step 1: Install Storybook Dependencies

```bash
npm install --save-dev \
  @storybook/nextjs \
  @storybook/addon-essentials \
  @storybook/addon-interactions \
  @storybook/test \
  @storybook/blocks \
  storybook \
  chromatic
```

Note: `@storybook/addon-docs` is included in `addon-essentials`.

### Step 2: Initialize Storybook Configuration

```bash
npx storybook@latest init --yes
```

This will:
- Create `.storybook/` directory
- Generate `main.ts` and `preview.ts` files
- Add Storybook scripts to `package.json`
- Install required peer dependencies

### Step 3: Configure `.storybook/main.ts`

Replace the generated `main.ts` with:

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.ts'),
    },
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
```

### Step 4: Create `.storybook/preview.ts`

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/nextjs';
import '../app/globals.css';
import { cn } from '@/lib/utils';

// Create a decorator to provide Tailwind dark mode toggle
const withTailwindTheme = (Story: React.ComponentType, context: { globals: { theme?: string } }) => {
  const theme = context.globals.theme;
  return (
    <div className={cn('dark' === theme && 'dark')}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circle', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [withTailwindTheme],
};

export default preview;
```

### Step 5: Create `.storybook/manager.ts` (Optional, for UI customization)

```typescript
// .storybook/manager.ts
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.normal,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  title: 'Zentrix UI',
  url: 'https://zentrix.dev',
});
```

### Step 6: Create Story Template for shadcn/ui Components

Create a base story template that can be reused:

```typescript
// .storybook/templates/base.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

export const getBaseMeta = <T>(componentName: string, component: React.ComponentType<T>) => ({
  title: `UI/${componentName}`,
  component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  argTypes: {},
});

export const createBaseStory = <T>(
  meta: ReturnType<typeof getBaseMeta<T>>,
  defaultArgs?: Partial<T>
) => {
  const DefaultStory = (args: T) => {
    const Component = meta.component;
    return <Component {...defaultArgs as T} {...args} />;
  };
  DefaultStory.args = defaultArgs || {};
  return DefaultStory;
};
```

### Step 7: Add Storybook Scripts to package.json

The init command adds these, but verify:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "storybook:build": "storybook build",
    "storybook:preview": "storybook preview"
  }
}
```

### Step 8: Create Component Stories

Example: `components/ui/button/button.stories.tsx`

```typescript
// components/ui/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button, buttonVariants } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Link = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Small = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Icon = {
  args: {
    size: 'icon',
    children: 'Icon',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
```

Example for dialog component:

```typescript
// components/ui/dialog/dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const DialogDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const meta: Meta<typeof DialogDemo> = {
  title: 'UI/Dialog',
  component: DialogDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DialogDemo>;

export const Default = {
  render: () => <DialogDemo />,
};
```

## Component Story Mapping

| Component | Story File | Notes |
|-----------|------------|-------|
| button | `button.stories.tsx` | Uses CVA variants |
| accordion | `accordion.stories.tsx` | Base UI accordion |
| tabs | `tabs.stories.tsx` | Base UI tabs |
| dialog | `dialog.stories.tsx` | Uses controlled open state |
| sheet | `sheet.stories.tsx` | Side drawer, similar to dialog |
| card | `card.stories.tsx` | Has header, content, footer slots |
| input | `input.stories.tsx` | Simple form input |
| label | `label.stories.tsx` | Often paired with input |
| textarea | `textarea.stories.tsx` | Multi-line input |
| avatar | `avatar.stories.tsx` | Image + fallback |
| badge | `badge.stories.tsx` | Variant control |
| skeleton | `skeleton.stories.tsx` | Loading placeholder |

## Dark Mode Support

For components that need to test both light and dark themes, use the `theme` global in stories:

```typescript
export const DarkModeExample = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  globals: { theme: 'dark' },
};
```

## Testing the Setup

```bash
# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Run with specific port
npm run storybook -- -p 6007
```

## Potential Issues and Solutions

### Issue 1: Tailwind v4 PostCSS not processing in Storybook

**Symptom**: Tailwind classes not applied in Storybook preview

**Solution**: Ensure `.storybook/preview.ts` imports the CSS file with `@import "tailwindcss"`:

```typescript
import '../app/globals.css';
```

If using a separate Tailwind entry for Storybook:

```typescript
// .storybook/tailwind.css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

### Issue 2: cn() utility not found

**Symptom**: Errors about `cn` not being defined

**Solution**: The `@/lib/utils` path alias must be configured. Verify `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue 3: Base UI components need client context

**Symptom**: "use client" related errors

**Solution**: Base UI components are client components. Add at top of story files if needed, though Storybook handles this automatically.

## File Modifications Summary

| File | Action |
|------|--------|
| `package.json` | Add Storybook dependencies |
| `.storybook/main.ts` | Create with Next.js framework config |
| `.storybook/preview.ts` | Create with Tailwind CSS import and theme decorator |
| `.storybook/manager.ts` | Create for UI customization |
| `components/ui/*/stories.tsx` | Create for each component |

## Dependencies to Add

```bash
npm install --save-dev \
  storybook \
  @storybook/nextjs \
  @storybook/addon-essentials \
  @storybook/addon-interactions \
  @storybook/test \
  @storybook/blocks \
  @storybook/react-docgen \
  chromatic
```

## Commands to Execute

```bash
# 1. Install dependencies
npm install --save-dev storybook @storybook/nextjs @storybook/addon-essentials @storybook/addon-interactions @storybook/test @storybook/blocks

# 2. Initialize Storybook (optional - creates template files)
# npx storybook@latest init --yes

# 3. Create configuration files manually (recommended to avoid template issues)

# 4. Create component stories

# 5. Run Storybook
npm run storybook
```

## Verification Checklist

- [ ] Storybook starts without errors
- [ ] Components render correctly in Canvas
- [ ] Tailwind CSS styles apply (check background colors, fonts)
- [ ] Dark mode toggle works
- [ ] Controls (variant, size) work for applicable components
- [ ] Interactive tests work (playwright tests)
- [ ] Build succeeds: `npm run build-storybook`
- [ ] Chromatic visual regression tests pass (if configured)

## Resources

- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs)
- [Storybook with Tailwind CSS v4](https://tailwindcss.com/docs/installation/using-postcss)
- [Tailwind v4 + Storybook Issues](https://github.com/tailwindlabs/tailwindcss/discussions/16451)
- [shadcn/ui Storybook Registry](https://github.com/lloydrichards/shadcn-storybook-registry)
- [Storybook Theming](https://storybook.js.org/docs/configure/styling-and-theming)