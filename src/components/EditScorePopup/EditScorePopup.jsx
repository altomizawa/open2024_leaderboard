export default function EditScorePopup() {
  return(
    <div className='editScorePopup'>
      <form className='editScorePopup__form'>
        <p className='editScorePopup__title'>24.1</p>
        <div className='editScorePopup__button-wrapper'>
          <p>DID YOU FINISH?</p>
          <div className='editScorePopup__button'>
            <div className='editScorePopup__selector'></div>
            <p>NO</p>
            <p>YES</p>
          </div>
        </div>
        <input type='number' />
      </form>
    </div>
  )
}