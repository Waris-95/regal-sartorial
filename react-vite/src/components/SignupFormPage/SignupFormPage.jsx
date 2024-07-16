import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../redux/session";
import './SignupForm.css';
import "../../index.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch CSRF token
    const fetchCsrfToken = async () => {
      const response = await fetch("/api/auth/restore", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.csrf_token);
      }
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    if (sessionUser) navigate("/");
  }, [sessionUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First Name cannot be empty or whitespace.";
    if (!lastName.trim()) newErrors.lastName = "Last Name cannot be empty or whitespace.";
    if (!email.trim()) newErrors.email = "Email cannot be empty or whitespace.";
    if (password !== confirmPassword) newErrors.password = "Confirm Password field must be the same as the Password field.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const data = await dispatch(signUp(firstName, lastName, email, password, csrfToken));
      // console.log('Backend response:', data);  // Debugging log

      if (data && data.email) {
        setErrors({ email: data.email });
        // console.log('Errors in state after setErrors:', data.errors);  // Debugging log
      } else {
        // console.log('Sign-up successful:', data);
      }
    } catch (error) {
      // console.error('An unexpected error occurred:', error);
      setErrors({ global: 'An unexpected error occurred. Please try again later.' });
    }
  };

  // console.log('Rendering with errors:', errors);  // Debugging log

  return (
    <div className="sign-up-container">
      <div className="sign-up-overlay"></div>
      <div className="sign-up-content">
        <h1 className="create-account">Create Your Account</h1>
        <form className="sign-up-form" onSubmit={handleSubmit} noValidate>
          {errors.global && <p className="sign-up-errors">*{errors.global}</p>}
          {errors.email && <p className="sign-up-errors">*{errors.email}</p>}
          
          <label className="sign-up-label">First Name</label>
          <input
            className="sign-up-input"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => ({ ...prev, firstName: '' }));
            }}
          />
          {errors.firstName && (<p className="sign-up-errors">*{errors.firstName}</p>)}

          <label className="sign-up-label">Last Name</label>
          <input
            className="sign-up-input"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((prev) => ({ ...prev, lastName: '' }));
            }}
          />
          {errors.lastName && (<p className="sign-up-errors">*{errors.lastName}</p>)}

          <label className="sign-up-label">Email</label>
          <input
            className="sign-up-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
          />
          {errors.email && (<p className="sign-up-errors">*{errors.email}</p>)} {/* Display email error */}

          <label className="sign-up-label">Password</label>
          <input
            className="sign-up-input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
          />

          <label className="sign-up-label">Confirm Password</label>
          <input
            className="sign-up-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
          />
          {errors.password && (<p className="sign-up-errors">*{errors.password}</p>)}

          <div className="sign-up-button">
            <button className="store-button-white sign-up-b" type="submit">Sign Up</button>
          </div>
        </form>
        <div className="login-link-container">
          <span className="login-text">Already have an account? </span>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
