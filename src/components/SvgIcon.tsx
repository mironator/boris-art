import React, { FC } from 'react'

export type SvgIconProps = {
  className?: string
  width?: string | number
  height?: string | number
  viewBox?: string
}

const SvgIcon: FC<SvgIconProps> = (props) => {
  const { className, children, ...other } = props

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg className={className} focusable="false" {...other}>
      {children}
    </svg>
  )
}

export default SvgIcon
