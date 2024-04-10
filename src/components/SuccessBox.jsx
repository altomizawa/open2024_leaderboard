export default function SuccessBox ({setIsLoginSuccessful, closePopup}) {

    const handleClosePopup = () => {
        setIsLoginSuccessful(false);
        closePopup();
    }

    return (
        <div className='successbox'>
            <div className='successbox__wrapper'>
                <h2 className='successbox__title'>LOGIN SUCCESSFUL</h2>
                <p className='successbox__message'>Let's get back to business</p>
                <button className='successbox__button' onClick={handleClosePopup}>GO</button>
            </div>
        </div>
    )
}