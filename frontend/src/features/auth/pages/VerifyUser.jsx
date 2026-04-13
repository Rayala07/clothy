import { useNavigate } from "react-router-dom"
import { getVerifyEmail, clearVerifyEmail, getOtpTimeLeft, clearOtpData, setOtpData } from "../utils/authStorage.js"
import { useEffect, useState } from "react"
import { verifyOtpSchema } from "../validator/auth.validator"
import { useAuth } from "../hook/useAuth"
import { resendOtp } from "../services/auth.service"

const VerifyUser = () => {
    const navigate = useNavigate()
    const email = getVerifyEmail()

    const {handleVerifyOtp, loading, error} = useAuth()

    const [otp, setOtp] = useState("")
    const [errors, setErrors] = useState({})
    const [timeLeft, setTimeLeft] = useState(() => (getOtpTimeLeft(email))) // Get exact timer from localStorage

    // Redirect if no email
    useEffect(() => {
        if(!email) {
            navigate("/register")
        }
    }, [email, navigate])


    // Timer logic
    useEffect(() => {
        if(timeLeft <= 0) return;
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev - 1))
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault()

        const result = verifyOtpSchema.safeParse({otp})

        if(!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((err) => {
                const field = err.path[0];
                fieldErrors[field] = err.message
            })

            setErrors(fieldErrors)
            return
        }

        setErrors({})

        try {
            await handleVerifyOtp({email, otp})
            clearVerifyEmail()
            clearOtpData()
            navigate("/login")
        }catch(err) {
            console.error("Verification Failed: ", err)
        }
    }

    const handleResend = async() => {
        const email = getVerifyEmail()
        await resendOtp({email})
        setOtpData(email)
        setTimeLeft(300)
    }
  return (
    <div>
      <h1>Verify OTP</h1>

      <form onSubmit={handleOtpSubmit}>
        <input type="text" name="otp" value={otp} onChange={(e) => (setOtp(e.target.value))} placeholder="Enter OTP"/>
        {errors.otp && <p>{errors.otp}</p>}

        <button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? "Verifying...":"Verify"}
        </button>
      </form>

      <div>
        <p>{formatTime(timeLeft)}</p>
        <button type="button" onClick={handleResend} disabled={timeLeft > 0}>
            Resend
        </button>
      </div>

      {/* {Backend error} */}
      {error && <p>{error}</p>}
    </div>
  )
}

export default VerifyUser
