import React, { useContext } from 'react';
import { useState, prevState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/componentsStyles/signUp/SignUp.css';
import { Formik, useFormik, Form, Field } from 'formik';
import * as Yup from "yup";
import { GlobalContext } from '../components/utils/GlobalContext';

const SignUp = () => {
  const { endpoint } = useContext(GlobalContext);
  const [enviado, setEnviado] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [loading, setLoading] = useState(false);


  const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&.])[A-Za-z0-9@$!%*?&.]{8,15}$/gm


  const user = {
    name: '',
    lastName: '',
    username: '',
    password: '',
    userType: "basicUser",
  }


  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required('You must enter your name.')
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(2, "Too short!")
      .max(50, "Too long"),
    lastName: Yup.string()
      .required('You must enter your lastname.')
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(2, "Too short!")
      .max(50, "Too long"),
    username: Yup.string()
      .required('You must enter your email')
      .matches(regexEmail, 'Invalid email format'),
    password: Yup.string()
      .required("Please enter your password")
      .matches(/^.*(?=.{8,15})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref('password'), null], "Passwords don't match."),
  });

  return (
    <div className='signUpForm'>
      {enviado ? (
        <p>Dear {" "}{userName}{" "}{userLastName}{", "} <br /><br />Please check your inbox for a confirmation email to complete your registration. Once confirmed, you can log in and start using our services.<br /><br /> Thank you for choosing EventPlace! <Link to={"/login"}><button>Sing in</button></Link></p>

      ) :
        <Formik
          initialValues={{
            name: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={data => {

            user.name = data.name;
            user.lastName = data.lastName;
            user.username = data.username;
            user.password = data.password;

            console.log(user)
            setLoading(true)

            fetch(`http://${endpoint}:8080/user/create-user`, {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then((response) => {
                if (response.ok) {
                  setLoading(false)
                  console.log('User registered!');
                  console.log(user);
                  setEnviado(true);
                  setUserName(user.name);
                  setUserLastName(user.lastName);
                } else {
                  console.error('Error');
                }
              })
              .catch((error) => console.error('Error', error));


            console.log(data);
            console.log(user);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {
                loading &&
                <div className='loading'>
                  Loading
                </div>
              }
              <h2>Sign Up</h2>
              <Field name="name" placeholder="Name" type="text" />
              {errors.name && touched.name ? (
                <div className='error'>{errors.name}</div>
              ) : null}

              <Field name="lastName" placeholder="Lastname" type="text" />
              {errors.lastName && touched.lastName ? (
                <div className='error'>{errors.lastName}</div>
              ) : null}

              <Field name="username" placeholder="Email" type="text" autocomplete="off" />
              {errors.username && touched.username ? (
                <div className='error'>{errors.username}</div>
              ) : null}


              <Field name="password" placeholder="Password" type="password" />
              {errors.password && touched.password ? (
                <div className='error'>{errors.password}</div>
              ) : null}

              <Field name="confirmPassword" placeholder="Confirm password" type="password" />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className='error'>{errors.confirmPassword}</div>
              ) : null}

              <div className='buttons'>
                <button className='submit' type='submit'>Sign Up</button>
                <button className='cancel'><Link to={"/"}>Cancel</Link></button>
              </div>
            </Form>
          )}
        </Formik>
      }
    </div>

  );
};

export default SignUp;