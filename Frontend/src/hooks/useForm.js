import React, { useState, useEffect } from 'react'

const useForm = (schema, initialValues) => {
  const [error, setError] = useState(false)
  const [values, setValues] = useState(initialValues)

  const setValue = (field, value) => setValues((old) => ({
      ...old,
      [field]: value
    }))

  const onChange = (field) => ({ target: { value }}) => setValue(field, value)

  const validate = () => {
    const validation = schema.validate(values)
    if (validation.error) {
      setError(validation.error.toString())
      return false
    }
    setError(false)
    return true
  }

  return {
    values,
    setValue,
    setValues,
    onChange,
    validate,
    error
  }
}

export default useForm