import { useEffect, useState } from "react";
import { login } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import './LoginForm.css';
import "../../index.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (sessionUser) return navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = e => {
    e.preventDefault();
    dispatch(login('dully@gmail.com', 'password'));
  }

  return (
    <div className="log-in-container">
      <div className="log-in-overlay"></div>
      <div className="log-in-content">
        <div className="log-in-title-box">
          <h1 className="log-in">Log In</h1>
        </div>
        <div className="log-in-form-box">
          <form className="log-in-form" onSubmit={handleSubmit}>
            <label className="log-in-label">
              Email
            </label>
            <input
              className="log-in-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (<p className={errors ? "errors-box" : "no-errors-box"}>*{errors.email}</p>)}
            <label className="log-in-label">
              Password
            </label>
            <input
              className="log-in-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!errors.email && errors.password && (<p className={errors ? "errors-box" : "no-errors-box"}>*{errors.password}</p>)}
            <div className="log-in-buttons-container">
              <button className="store-button-white log-in-buttons" type="submit">Log In</button>
              <button className="store-button-white log-in-buttons" onClick={demoUser} type='submit'>Demo User</button>
            </div>
          </form>
        </div>
        <div className="signup-link-container">
          <span className="signup-text">Don't have an account? </span>
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
