import { forwardRef } from 'react'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  invalid?: boolean
}

const baseStyles =
  'text-body-1 resize-none rounded-12 border-1 border-gray-200 p-12 font-medium text-gray-800 placeholder:text-gray-500'
const invalidStyles = 'border-semantic-negative'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      fullWidth = false,
      size = 'md',
      invalid = false,
      value,
      placeholder,
      className = '',
      ...props
    },
    ref
  ): JSX.Element => {
    const textAreaClass = twMerge(
      baseStyles,
      clsx(
        {
          'w-full': fullWidth,
          'h-100': size === 'sm',
          'h-104': size === 'md',
          'h-140': size === 'lg',
          [invalidStyles]: invalid,
        },
        className
      )
    )
    return (
      <textarea
        ref={ref}
        value={value}
        className={textAreaClass}
        placeholder={placeholder}
        {...props}
      />
    )
  }
)
TextArea.displayName = 'TextArea'
