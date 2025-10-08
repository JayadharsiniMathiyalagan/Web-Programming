
import React, {useState,useEffect,useRef} from "react";

const Stopwatch = ()=>{
    const [isRunning,setIsRunning] = useState(false);
    const [time,setTime] = useState(0)
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);


    useEffect(()=>{
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                setTime((prev)=>prev+10);
            },10);
        }
        else{
            clearInterval(intervalRef.current);
        }
        return ()=> clearInterval(intervalRef.current);
    },[isRunning]);

    const handleStart = ()=>{
        setIsRunning(true);
    }
    const handleStop = ()=>{
        setIsRunning(false);
    }

    const handleAddLap = ()=>{
        if(isRunning){
            setLaps((prev)=>[...prev,time]);
        }
    }

    const handleReset = ()=>{
        setIsRunning(false);
        setTime(0);
        setLaps([])
    }
    const formatTime = (t)=>{
        const minutes = Math.floor(t/60000);
        const seconds = Math.floor((t%60000)/1000);
        const milliseconds = Math.floor((t%60000)/10);

        return (
            String(minutes).padStart(2,"0") + ":" +
            String(seconds).padStart(2,"0") + "." +
            String(milliseconds).padStart(2,"0")
        )

    }

    return <>
    <div>
        <h1>Stopwatch</h1>
        <h2>{formatTime(time)}</h2>
        <div>
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handleStop} disabled={!isRunning}>Stop</button>
            <button onClick={handleAddLap} disabled={!isRunning}>Add Lap</button>
            <button onClick={handleReset} >Reset</button>
            
        </div>
    </div>
    </>

}

export default Stopwatch;
app.js
import logo from './logo.svg';
import './App.css';
import Stopwatch from './components/Stopwatch';
function App() {
  return (
    <>
    <Stopwatch />
    </>
  );
}

export default App;

