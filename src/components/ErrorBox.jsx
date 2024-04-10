export default function ErrorBox(props) {
  // GET THE TYPE OF CONTENT THAT SHOULD BE DISPLAYED
  const { type } = props

  // CREATE CONTENT
  let content
  const login = {
    message: "Sorry, we couldn't login. Check your credentials and try again",
    action: (<p className='errorbox__message'>Forgot your password?<a className='errorbox__link'> Click here.</a></p>),
  }

  const signup = {
    message: "Sorry, we could't create your account. Try again later",
    action: (<div className='errorbox__message'></div>),
  }

  // SELECT WHICH CONTENT IS GOING TO BE DISPLAYED
  switch(type) {
    case 'login':
      content = login;
      break
    case 'signup':
      content = signup;
      break
  }

  return (
    <div className='errorbox'>
      <p className='errorbox__message'>{content.message}</p>
      {content.action}
    </div>
  )
}