import React from 'react'

export default function Collection({ name, className, onClick }) {
  return (
    <div className={className} onClick={onClick}>{name}</div>
  )
}
