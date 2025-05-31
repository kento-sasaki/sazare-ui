// src/components/Button/Button.tsx
import React from 'react';
import { cva } from '../../../styled-system/css'; // Panda CSSのcva関数をインポート
// import { HTMLStyledProps } from '../../../styled-system/jsx'; // スタイリングされたHTML要素の型

// ボタンのスタイルを定義するCVAレシピ
const button = cva({
  // ベーススタイル
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md', // panda.config.ts で定義したtokensのborderRadiusを使う
    fontWeight: 'medium', // panda.config.ts で定義したtokensのfontWeightを使う
    cursor: 'pointer',
    transitionProperty: 'background-color, color, border-color, box-shadow',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out',
    // 影は控えめに
    boxShadow: 'subtle', // panda.config.ts で定義したtokensのshadowsを使う
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'primary', // フォーカス時のアウトライン色
      outlineOffset: '2px',
    },
  },

  // バリアントの定義
  variants: {
    // 色のバリアント
    variant: {
      primary: {
        backgroundColor: 'primary',
        color: 'white',
        _hover: { backgroundColor: 'colors.primary.600' }, // マウスホバー時の色
        _active: { backgroundColor: 'colors.primary.700' }, // クリック時の色
      },
      secondary: {
        backgroundColor: 'secondary',
        color: 'white',
        _hover: { backgroundColor: 'colors.secondary.600' },
        _active: { backgroundColor: 'colors.secondary.700' },
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: 'text', // 枠線色
        borderWidth: '1px',
        color: 'text',
        _hover: { backgroundColor: 'gray.100' },
        _active: { backgroundColor: 'gray.200' },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'text',
        _hover: { backgroundColor: 'gray.100' },
        _active: { backgroundColor: 'gray.200' },
      },
    },
    // サイズのバリアント
    size: {
      sm: {
        height: '8', // panda.config.ts のspacing '8' (32px)
        paddingInline: '4', // panda.config.ts のspacing '4' (16px)
        fontSize: 'sm',
      },
      md: {
        height: '10', // panda.config.ts のspacing '10' (40px)
        paddingInline: '5', // panda.config.ts のspacing '5' (20px)
        fontSize: 'base',
      },
      lg: {
        height: '12', // panda.config.ts のspacing '12' (48px)
        paddingInline: '6', // panda.config.ts のspacing '6' (24px)
        fontSize: 'lg',
      },
    },
    // 無効化状態のバリアント
    disabled: {
      true: {
        opacity: '0.6',
        cursor: 'not-allowed',
        boxShadow: 'none',
      },
    },
  },

  // デフォルトのバリアント値
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// `button` レシピの型を抽出
export type ButtonVariants = NonNullable<Parameters<typeof button>[0]>;

// Propsの型定義
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & ButtonVariants;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={button({ variant, size, disabled })} // cva関数にバリアントを渡してクラス名を生成
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
