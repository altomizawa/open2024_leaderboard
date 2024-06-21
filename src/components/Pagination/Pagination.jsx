import '../../styles/Pagination.css'

function Pagination({ currentLeaderboard }) {
  const pages = (currentLeaderboard.length)/10
  console.log(pages)
  return (
    <div className='pagination'>
      {currentLeaderboard.map((item, index) => (
        <a>{index+1}</a>
      ))}
      </div>
  )
}

export default Pagination
