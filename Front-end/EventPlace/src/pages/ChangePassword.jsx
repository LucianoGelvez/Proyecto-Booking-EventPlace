import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { routes } from '../Routes'
import { GlobalContext } from '../components/utils/GlobalContext';

const ChangePassword = () => {
    const { endpoint } = useContext(GlobalContext);
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [succes, setSucces] = useState(false)
    const [loading, setLoading] = useState(false)
    const { token } = useParams()

    let data = {
        token: token,
        password: password
      };

      useEffect(()=>{
        data = 
        {
            token: token,
            password: password
        }
      }, [password])
  
    const handleSubmit = (event) => {
      setLoading(true)
      event.preventDefault();
      console.log(data)

      if(password != password2)
      {
        setError(true)
      }
      if(password == "" || password2 == "")
      {
        setError2(true)
      }
    
    
   if(error == false && error2 == false)
   {
       fetch(`http://${endpoint}:8080/confirmToken/changePassword`, {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify(data)
       })
         .then(response => {
           if (response.ok) {
               setSucces(true)
            setLoading(false)
           } else {
            setLoading(false)
            setError3(true)
             throw new Error('Error en la solicitud'); 
           }
         })
      
         .catch(error => {
           console.error(error);
         });
     };
   }
    


  return (
    <section class="login">
    {
      error &&
    <div class="login__error">You need to type the same password</div>
    }
    {
      error2 &&
    <div class="login__error">Password can not be empty</div>
    }
    {
      error3 &&
    <div class="login__error">The 10 minutes we gave your are done, try to reset your password again</div>
    }
    {
      succes &&
    <div class="succes">Password changed!</div>
    }
      {
    loading &&
    <div className='loading'>
        Loading
    </div>
  }
    <h1 class="login__title">Change your password</h1>
    <form className="login__form" onSubmit={handleSubmit}>
      <div class="login__form-field">
        <label for="password" class="login__label">Password:</label>
        <input type="text" id="password" name="password" class="login__input" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div class="login__form-field">
        <label for="password" class="login__label">Confirm Password:</label>
        <input type="text" id="password" name="password" class="login__input" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
      </div>
      <button type="submit" class="login__button">Change Password</button>
    </form>
  </section>
  )
}

export default ChangePassword
