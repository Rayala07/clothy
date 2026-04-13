import { useState } from "react"
import { useAuth } from "../hook/useAuth.js"
import { loginSchema } from "../validator/auth.validator.js"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const {handleLoginUser, loading, error} = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = loginSchema.safeParse(formData)

    if(!result.success) {
      const fieldErrors = {}

      result.error.issues.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message
      })

      setErrors(fieldErrors)
      return
    }

    setErrors({})

    try {
     await handleLoginUser(formData)
     navigate("/dashboard")
    } catch(err) {
      console.error("Login Failed: ", err.message)
    }
  }
  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
        {errors && <p className="text-red-600">{errors.email}</p>}
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
        {errors && <p className="text-red-600">{errors.password}</p>}

        <button className="cursor-pointer" type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
      {/* {Backend error} */}
      {error && <p>{error}</p>}

      <div>
        <p>New to Clothy ? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login
