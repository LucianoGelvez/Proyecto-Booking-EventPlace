import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../components/utils/GlobalContext'

const SendConfirmationEmailAgain = () => {
  const { endpoint } = useContext(GlobalContext);
    const [email, setEmail] = useState()
    const [succes, setSucces] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true)
      setError(false)
    
      fetch(`http://${endpoint}:8080/confirmToken/sendConfirmationAgain/` + email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            setSucces(true)
            setLoading(false)
            setTimeout(function () {
              window.location.href = "/login";
            }, 4000);
          } else {
            setError(true);
            setLoading(false)
            throw new Error('Error en la solicitud'); 
          }
        })
        .catch(error => {
          console.error(error);
        });
      
    };


  return (
<section class="login">
  {
    error &&
  <div class="login__error">That account is already enabled or it was deleted!</div>
  }
  {
    succes &&
    <div className='succes'>Check your email to change your password!</div>
  }
  {
    loading &&
    <div className='loading'>
        Loading
    </div>
  }
  <h1 class="login__title">Send confirmation email again</h1>
  <form className="login__form" onSubmit={handleSubmit}>
    <div class="login__form-field">
      <label for="email" class="login__label">Email Address:</label>
      <input type="email" id="email" name="email" class="login__input"   value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <button type="submit" class="login__button">Send</button>
  </form>
  <div>

  </div>
</section>
  )
}

export default SendConfirmationEmailAgain
