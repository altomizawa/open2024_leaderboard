import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return(
    <div style={{position: 'absolute', width: '100vw', height: '100vh', backgroundColor:'white', top: 0, left: 0, display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
         <h1>Nothing to see here</h1>
         <Link to='/' style={{textDecoration: 'underline', color: 'black', marginTop: '1rem'}}>Click here to go back</Link>
    </div>
  )
}