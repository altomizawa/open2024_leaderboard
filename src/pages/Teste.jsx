import { useState} from "react";

export default function Teste () {
    const [teste, setTeste] = useState(false)

    const handleClick = () => {
        setTeste(prevState => !prevState)
    }

    return (
        <>
        <h1>{teste ? 'teste' : 'clicou'}</h1>
        <button onClick={() => {handleClick}}> teste</button>
        </>
    )
}