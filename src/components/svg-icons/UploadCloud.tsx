import React, { FC } from 'react'

import SvgIcon, { SvgIconProps } from '@components/SvgIcon'

const UploadCloud: FC<SvgIconProps> = (props) => (
  <SvgIcon width="73" height="60" {...props}>
    <path
      d="M37.098 0c-4.918 0-9.657 1.79-13.342 5.038a20.24 20.24 0 00-6.43 11.028h-.194C7.686 16.066 0 23.75 0 33.197 0 42.644 7.686 50.33 17.132 50.33h6.287a1.542 1.542 0 100-3.083h-6.287c-7.747 0-14.049-6.302-14.049-14.049 0-7.746 6.302-14.048 14.049-14.048.413 0 .849.022 1.334.068a1.543 1.543 0 001.672-1.327 17.149 17.149 0 015.657-10.538 17.08 17.08 0 0111.303-4.268c9.45 0 17.139 7.689 17.139 17.139 0 .34-.063 1.22-.063 1.22a1.54 1.54 0 001.692 1.643c.41-.042.823-.063 1.229-.063 6.678 0 12.11 5.433 12.11 12.111 0 6.678-5.432 12.11-12.11 12.11h-6.904a1.542 1.542 0 000 3.084h6.904c8.378 0 15.194-6.816 15.194-15.194 0-8.303-6.695-15.072-14.97-15.192C57.166 8.92 48.154 0 37.098 0zm0 7.246c-6.446 0-11.964 4.817-12.835 11.205a1.543 1.543 0 001.319 1.736c.899.125 1.63-.546 1.735-1.319.664-4.868 4.87-8.539 9.781-8.539a1.542 1.542 0 000-3.083zm-.293 26.837c-.607 0-1.213.216-1.696.648L29.5 39.74a1.542 1.542 0 102.054 2.3l3.708-3.313v18.965a1.542 1.542 0 003.084 0V38.727l3.708 3.313a1.542 1.542 0 102.054-2.3L38.5 34.73a2.54 2.54 0 00-1.696-.648z"
      fill="inherit"
      fillRule="nonzero"
    />
  </SvgIcon>
)

export default UploadCloud
