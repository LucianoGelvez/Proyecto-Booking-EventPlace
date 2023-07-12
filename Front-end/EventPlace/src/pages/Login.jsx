import React, { useContext, useEffect, useState  } from 'react'
import '../styles/componentsStyles/logIn/LogIn.css';
import { Link } from 'react-router-dom';
import { routes } from '../Routes';
import { GlobalContext } from '../components/utils/GlobalContext';

function Login() {
  const { endpoint } = useContext(GlobalContext);
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)
  const [triedToLogin, setTriedToLogin] = useState(false)
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: email,
      password: password
    };

    
  
    fetch(`http://${endpoint}:8080/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setError(true)
          throw new Error('Error en la solicitud');
        }
      })
      .then(result => {
        localStorage.setItem("name", JSON.stringify(result.name))
        localStorage.setItem("lastName", JSON.stringify(result.lastName))
        localStorage.setItem("token", JSON.stringify(result.token))
        localStorage.setItem("userType", result.userType)
        localStorage.setItem("id", JSON.stringify(result.id))
        localStorage.setItem("userName", JSON.stringify(result.userName))
        localStorage.setItem("iniciales", result.name.charAt(0) + result.lastName.charAt(0));
        window.location.href = '/';
      })
      .catch(error => {
        console.error(error);
      });

  };


  useEffect(() => {
    if (localStorage.getItem("triedToLogin") === "true") {
      setTriedToLogin(true);
    }
  }, []);



  return (
    <section class="login">
      {
        error &&
        <div class="login__error">Wrong email or password</div>
      }

      <h1 class="login__title">Log in</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div class="login__form-field">
          <label for="email" class="login__label">Email Address:</label>
          <input type="email" id="email" name="email" class="login__input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="login__form-field">
          <label for="password" class="login__label">Password:</label>
          <input type="password" id="password" name="password" class="login__input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class="login__button">Submit</button>
      </form>
      <div>
        <Link to={routes.resetPassword}>
          <div>Forgot your password?</div>
        </Link>
        <Link to={routes.sendConfirmationAgain}>
          <div>Send confirmation email again</div>
        </Link>
      </div>
      <div class="login__register-info">Don't have an account?
      <Link to={routes.signUp}>
        <div class="login__register-link">Register</div>
      </Link>
      </div>
    </section>


  )
}

export default Login

