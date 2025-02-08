import { cn } from '@/lib/utils'

type Variant = 'contained' | 'outlined'
type Rounded = 8 | 12
type Padding = 0 | 10 | 16 | 20 | 30 | 32 | 40
type Margin = 0 | 10 | 20 | 30 | 40
type Color = 'primary' | 'secondary' | 'tertiary'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  rounded?: Rounded
  padding?: Padding
  margin?: Margin
  color?: Color
}

const BaseStyle = 'flex flex-col items-center justify-center w-full'

const styleByVariant: Record<Variant, string> = {
  outlined: 'border-1 border-solid border-gray-200 bg-common-white',
  contained: 'bg-gray-100',
}

const styleByRounded: Record<Rounded, string> = {
  8: 'rounded-8',
  12: 'rounded-12',
}

const styleByPadding: Record<Padding, string> = {
  0: 'p-0',
  10: 'p-10',
  16: 'p-16',
  20: 'p-20',
  30: 'p-30',
  32: 'p-32',
  40: 'p-40',
}

const styleByMargin: Record<Margin, string> = {
  0: 'm-0',
  10: 'm-10',
  20: 'm-20',
  30: 'm-30',
  40: 'm-40',
}

const styleByColor: Record<Color, string> = {
  primary: 'bg-common-white',
  secondary: 'bg-gray-100',
  tertiary: 'bg-gray-900',
}

export const Box = ({
  children,
  variant = 'outlined',
  rounded = 12,
  padding = 0,
  margin = 0,
  color = 'primary',
  className = '',
}: BoxProps): JSX.Element => {
  const roundedStyle = styleByRounded[rounded] || ''
  const paddingStyle = styleByPadding[padding] || ''
  const marginStyle = styleByMargin[margin] || ''
  const colorStyle = styleByColor[color] || ''

  const boxStyle = cn(
    BaseStyle,
    styleByVariant[variant],
    roundedStyle,
    paddingStyle,
    marginStyle,
    colorStyle,
    className
  )

  return <div className={boxStyle}>{children}</div>
}
