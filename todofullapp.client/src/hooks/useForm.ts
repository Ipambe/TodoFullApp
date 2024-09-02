import React, { useState } from 'react'

export const useForm = <T extends Record<string, unknown>>(initialForm: T) => {
  const [form, setForm] = useState(initialForm)

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setForm({
      ...form,
      [name]: value
    })
  }

  const onResetForm = (e: React.FormEvent) => {
    e.preventDefault()
    setForm(initialForm)
  }

  return {
    form,
    onInputChange,
    onResetForm,
    ...form
  }
}
