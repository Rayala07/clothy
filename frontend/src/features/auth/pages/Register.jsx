import { useAuth } from "../hook/useAuth"
import { useState } from "react"
import { registerSchema } from "../validator/auth.validator"
import {useNavigate, Link} from "react-router-dom"
import {setVerifyEmail, setOtpData} from "../utils/authStorage.js"

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        contact: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const {handleRegister, loading, error} = useAuth()

    const navigate = useNavigate()

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

      // Validate user input
      const result = registerSchema.safeParse(formData)

      if(!result.success) {
        const fieldErrors = {};

        result.error.issues.forEach((err) => {
          const field = err.path[0]; // Sets name: "email", "password"
          fieldErrors[field] = err.message
        })

        setErrors(fieldErrors)
        return
      }

      // If at initial stage user gave any invalid input and recieved error, and the second time he corrected those errors
      // or triggered some different error, so a new setErrors should get formed, so clear before submitting or re-attempt.
      setErrors({})

      try {
        await handleRegister(formData)
        setVerifyEmail(formData.email)
        setOtpData(formData.email)
        navigate("/verify-otp")
      } catch(err) {
        console.error("Registration Failed: ", err)
      }
    }


  return (
    <div>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Fullname"/>
        {errors.fullname && <p className="text-red-800">{errors.fullname}</p>}
        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <p>{errors.email}</p>}
        <input type= "tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="Phone number" />
        {errors.contact && <p>{errors.contact}</p>}
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        {errors.password && <p>{errors.password}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* {Backend Error} */}
      {error && <p>{error}</p>}

      <div>
        <p>Already a user ? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register
