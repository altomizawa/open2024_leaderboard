import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  const [input, setInput] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const { handleClosePopup, popupRef} = props;

  
  const navigate = useNavigate();
  
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const regexEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // VALIDATE EMAIL
  const validateEmail = (email) => {
    if (email && email.length > 0) {
      return regexEmail.test(email) ? '' : 'Please enter a valid email address.'
    }
  }
  
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  // VALIDATE PASSWORD
  const validatePassword = (password) => {
    if (password && password.length > 0) {
      return regexPassword.test(password) ? '' : 'Password must be between 4 and 8 digits long and include at least one numeric digit.'
    }
  }

  // CREATE INPUTS
  const inputs = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'EMAIL',
      required: true,
      errorMessage: validateEmail(input.email),
      className: 'login__input',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'PASSWORD',
      required: true,
      errorMessage: validatePassword(input.password),
      className: 'login__input',
    }
  ]

  useEffect(() => {
    if(input.email && input.password) {
      setIsFormValid(true)
    }
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(regexPassword.test(input.password)) {
      console.log(input);
      // navigate('/admin');
      // handleClosePopup();
    }
    console.error('Username or Password incorrect')
  }
  console.log(Math.random()*10)


  return (
    <div className='login'>
      <form className='login__form' ref={popupRef} onSubmit={handleSubmit}>
        <h2 className='login__close-btn' onClick={handleClosePopup}>X</h2>
        <h2 className='login__title'>SIGN IN</h2>
        {inputs.map((input) => (
          <>
            <input key={input.name} name={input.name} type={input.type} placeholder={input.placeholder} required={input.required} className={input.className} onChange={handleInput} />
            <span style={{color: 'grey', fontWeight: 200}}>{input.errorMessage}</span>
          </>
        ))}
        {/* <input name='email' type='email' placeholder='EMAIL' className='login__input' onChange={handleInput} autoComplete='true' /> */}
        {/* {!isEmailValid && input.email.length >0 && <p style={{color: 'grey', fontWeight: 200}} >Please insert a valid email address</p>} */}
        {/* <input name='password' type='password' placeholder='PASSWORD' className='login__input' onChange={handleInput} autoComplete='true'/> */}
        {/* {!isPasswordValid && input.password.length >0 && <p style={{color: 'grey', fontWeight: 200}} >Please insert a valid password</p>} */}
        <p className='login__paragraph'>Not a member? <a className='login__link'>Sign up now</a></p>
        <button type='submit' className={isFormValid ? 'login__button' : 'login__button login__button_inactive'}>ENTER</button>
        <h2 className='login__background-type'>SIGN IN</h2>
      </form>
    </div>
  )
}