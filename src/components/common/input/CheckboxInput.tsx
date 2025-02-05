import { IcCheck, IcCheckboxCheck } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { handleKeyDown } from '@/utils/handleKeyDown'
import { toggleCheckbox } from '@/utils/toggleCheckbox'

export interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode
  variant: 'checkbox' | 'check'
}

export const CheckboxInput = ({
  label,
  variant = 'checkbox',
  className = '',
  checked = false,
  disabled,
  onChange,
  ...props
}: CheckboxInputProps): JSX.Element => {
  const getCheckboxIcon = (checked: boolean) => {
    const checkBoxClass = cn(
      'flex h-20 w-20 items-center justify-center rounded-3 border-[1.4px] border-solid border-gray-300 bg-common-white',
      { 'border-0 bg-primary-normal': checked }
    )
    const checkClass = 'text-common-white'
    return (
      <div className={checkBoxClass}>
        <IcCheckboxCheck className={checkClass} alt='체크된 체크박스' />
      </div>
    )
  }

  const getCheckIcon = (checked: boolean) => {
    const checkClass = cn('text-gray-300', { 'text-primary-normal': checked })
    const checkAlt = checked ? '체크된 체크' : '체크 안 된 체크'
    return (
      <IcCheck width={24} height={24} className={checkClass} alt={checkAlt} />
    )
  }

  const getIconForState = (variant: string, checked: boolean) => {
    if (variant === 'checkbox') {
      return getCheckboxIcon(checked)
    }
    return getCheckIcon(checked)
  }

  const handleToggle = () => {
    if (!disabled) {
      toggleCheckbox(checked, onChange, props.value)
    }
  }

  const labelClass = cn(
    'flex gap-4 items-center cursor-pointer',
    disabled && 'opacity-50'
  )
  const buttonClass = cn(
    'focus:outline-none focus:ring-1 focus:ring-primary-normal',
    disabled && 'cursor-not-allowed opacity-50'
  )
  const labelTextClass = cn('text-body3 text-gray-800', className)
  return (
    <label className={labelClass}>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
        className='hidden'
      />
      <span
        role='checkbox'
        tabIndex={0}
        aria-checked={checked}
        aria-label={'checkbox button'}
        onKeyDown={e => handleKeyDown(e, handleToggle, disabled)}
        className={buttonClass}
      >
        {getIconForState(variant, checked)}
      </span>
      <span className={labelTextClass}>{label}</span>
    </label>
  )
}
