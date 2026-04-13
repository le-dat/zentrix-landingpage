import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './skeleton'
import { Card, CardContent, CardHeader, CardTitle } from './card'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    className: 'h-4 w-32',
  },
}

export const Circle: Story = {
  args: {
    className: 'size-10 rounded-full',
  },
}

export const Rectangle: Story = {
  args: {
    className: 'h-32 w-full',
  },
}

export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  ),
}