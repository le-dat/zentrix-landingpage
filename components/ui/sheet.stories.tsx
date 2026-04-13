"use client"

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

const meta: Meta<typeof Sheet> = {
  title: 'UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sheet>

const SheetDemo = ({ side = 'right' }: { side?: 'top' | 'right' | 'bottom' | 'left' }) => {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet description.
          </SheetDescription>
        </SheetHeader>
        <p>Sheet content goes here.</p>
      </SheetContent>
    </Sheet>
  )
}

export const Default: Story = {
  render: () => <SheetDemo />,
}

export const LeftSide: Story = {
  render: () => <SheetDemo side="left" />,
}

export const BottomSide: Story = {
  render: () => <SheetDemo side="bottom" />,
}