import loader from '../../assets/bouncing-circles.svg'

export default function Loader() {
  return (
    <div className='loader'>
      <img className='loader__img' src={loader} alt='loader' />
      <p className='loader__type'>Loading data. This may take up to 50s if the server is idle</p>
    </div>
  )
}