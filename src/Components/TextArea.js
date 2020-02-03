import React from 'react'


const TextArea = ({ children, ...props }) => (
  <textarea className={`TextArea`} {...props}>
    {children}
  </textarea>
)

export default TextArea
