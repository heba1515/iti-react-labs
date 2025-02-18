import React, { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from '../../redux/counterSlice';

export default function Contact() {

  let {count}= useSelector((store)=> store.counter);
  
  let dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={()=>dispatch(increase())} className='btn btn-primary mx-3'>increase</button>
      {count}
      <button onClick={()=>dispatch(decrease())} className='btn btn-danger mx-3'>decrease</button>
    </div>
  )
}
