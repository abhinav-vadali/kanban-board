import { FC, useState } from 'react'

interface CounterProps {
    initial: number
}

const Counter: FC<CounterProps> = ({ initial }) => { 
    const [count, setCount] = useState(initial);
    const handleClick = () => setCount(count + 1);
    return (
        <div>
            <h1>Counter</h1>
            <h2>Increase</h2>
        <button onClick = {handleClick}>+</button>
        </div>

    )
}

export default Counter;
