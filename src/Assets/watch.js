import React from "react"

function Watch(props) {
  return (
    <svg
      className="prefix__bi prefix__bi-eye-fill"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <title>{"Unwatch"}</title>
      <span className="visually-hidden">
        {'Unwatch'}
    </span>
      <path d="M12.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      <path
        fillRule="evenodd"
        d="M2 10s3-5.5 8-5.5 8 5.5 8 5.5-3 5.5-8 5.5S2 10 2 10zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default Watch