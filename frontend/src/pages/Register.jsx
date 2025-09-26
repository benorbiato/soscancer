import { useState } from 'react'
import { RegisterCard } from '../modules/registry/components'

import { createUser } from '@/lib/api/users'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('Supporter')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    setMessage('')
    setIsError(false)
    try {
      const data = await createUser({ name, email, password, phone, role })
      setMessage(`User created: ${data.id}`)
      setIsError(false)
      setName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setRole('Supporter')
    } catch (err) {
      setMessage(`Error: ${err.message}`)
      setIsError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return <RegisterCard />
}
