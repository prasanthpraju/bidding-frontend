import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:3000/api/v1/user/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.message || 'Registration failed')
        setLoading(false)
        return
      }

      navigate('/login')
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <section className="bg-black text-white min-h-[calc(100vh-72px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-3xl font-bold mb-8 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm outline-none focus:border-white transition-colors"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm outline-none focus:border-white transition-colors"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm outline-none focus:border-white transition-colors"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black font-semibold text-sm py-3 rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-neutral-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register