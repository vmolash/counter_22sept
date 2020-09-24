import React, {useState} from 'react';
import { v4 as uuidv4} from 'uuid';

const initialCounters = [
    {id: 1, title: 'Green', count: 1},
    {id: '2sdf', title: 'Pink', count: 2},
    {id: 3, title: 'Orange', count: 3},
    {id: 'sdf3', title: 'Purple', count: 4},
    {id: '2vbn', title: 'Blue', count: 5}
];

function App() {

    const [counters, setCounters] = useState(initialCounters);
    const [title, setTitle] = useState('');
    const [val, setVal] = useState('');

    const changeCount = (id, value) => {
        const newCounters = counters.map(el => {
            if(el.id === id) {
                el.count += value;
                return el;
            }
            return el;
        })
        setCounters(newCounters);
    }

    const upById = (id) => {
        const newCounters = [...counters];
        for(let i = 1; i<newCounters.length; i++){
            if(newCounters[i].id === id) {
                let temp = {...newCounters[i]};
                newCounters[i] = {...newCounters[i - 1]};
                newCounters[i-1] = temp;
            }
        }
        setCounters(newCounters);
    }
    const downById = (id) => {
        const newCounters = [...counters];
        for(let i = newCounters.length-1; i>=0; i--) {
            if(newCounters[i].id === id){
                if(i!== (newCounters.length-1)){
                    let temp = {...newCounters[i]};
                    newCounters[i] = {...newCounters[i+1]};
                    newCounters[i+1] = temp;
                }
            }
        }
        setCounters(newCounters);
    }

    const resetCounter = (id) => {
        const newCounter = counters.map( el => {
            if(el.id === id) {
                el.count = 0;
                return el;
            }
            return el;
        })
        setCounters(newCounter);
    }
    const deleteById = (id) =>  {
        const filteredCounters = counters.filter(el => el.id !== id);
        setCounters(filteredCounters);
    }

    const addCounter = () => {
        const newCounter = [...counters];
        if(title && val) {
            newCounter.push({id: uuidv4(), title: title, count: val});
            setCounters(newCounter);
        }

        setTitle('');
        setVal('');
    }

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }
    const changeValue = (event) => {
        setVal(+event.target.value);
    }

    return (
        <div>
            Counters
            <ul>
                {counters.map( el =>
                    <li key={el.id}>
                        {el.title}
                        <button onClick={() => changeCount(el.id, -1)}>-</button>
                        {el.count}
                        <button onClick={() => changeCount(el.id, 1)}>+</button>
                        <button onClick={() => resetCounter(el.id)}>Reset</button>
                        <button onClick={() => deleteById(el.id)}>Delete</button>
                        <button onClick={() => upById(el.id)}>Up</button>
                        <button onClick={() => downById(el.id)}>Down</button>
                    </li>
                )}
            </ul>

            <input type="text" onChange={changeTitle} value={title} placeholder='Counter title'/>
            <input type="number" onChange={changeValue} value={val} placeholder='Counter value'/>
            <button onClick={addCounter}>Add counter</button>
        </div>
    );
}

export default App;
