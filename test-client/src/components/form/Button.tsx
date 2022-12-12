import React, { ReactNode } from 'react'

type Variant = 'primary' | 'success' | 'warning' | 'danger'
type ButtonType = 'submit' | 'button'

type Props = {
  variant?: Variant,
  type?: ButtonType,
  onClick?: () => void,
  children: ReactNode | string
}

export const Button = ({
  variant = 'success',
  type = 'button',
  onClick = () => {},
  children,
  ...props
}: Props) => {
  return (
    <button
      className={`button-${variant}`}
      type={type}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
