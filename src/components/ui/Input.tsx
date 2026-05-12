import type { ChangeEvent } from 'react'

interface InputProps {
  label: string
  name: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  textarea?: boolean
  className?: string
}

const baseClasses =
  'block w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500'

function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  disabled,
  error,
  textarea,
  className = '',
}: InputProps) {
  const errorBorder = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  const classes = `${baseClasses} ${errorBorder} ${className}`

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={classes}
          rows={3}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={classes}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export { Input }
