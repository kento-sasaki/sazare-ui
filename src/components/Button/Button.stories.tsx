// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

// メタデータ: Storybookでの表示設定
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Storybookのサイドバーでの表示パス
  component: Button,          // 使用するコンポーネント
  parameters: {
    layout: 'centered',       // ストーリーのレイアウト
  },
  tags: ['autodocs'],
  // Propsのコントロール設定
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'ボタンの種類',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'ボタンのサイズ',
    },
    disabled: {
      control: 'boolean',
      description: 'ボタンの無効化状態',
    },
    onClick: {
      action: 'clicked', // クリック時にログに出力
      description: 'クリックイベントハンドラ',
    },
    children: {
      control: 'text',
      description: 'ボタンのテキスト内容',
    },
  },
  // デフォルトの引数
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export default meta;

// ストーリーの定義

type Story = StoryObj<typeof meta>;

// プライマリーボタンのストーリー
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// セカンダリーボタンのストーリー
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// アウトラインボタンのストーリー
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

// ゴーストボタンのストーリー
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

// サイズ別のストーリー
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
  args: {
    variant: 'primary',
  },
};

// 無効化されたボタンのストーリー
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// disabled 状態の variant ごとの表示
export const DisabledVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button {...args} variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button {...args} variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button {...args} variant="outline" disabled>
        Outline Disabled
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost Disabled
      </Button>
    </div>
  ),
  args: {
    // children: 'Disabled', // childrenは個別に設定するのでここでは不要
  },
};
