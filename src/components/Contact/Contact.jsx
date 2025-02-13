import React, { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'

export default function Contact() {

  let {count}= useContext(CounterContext);
  console.log(count);
  
  return (
    <div>Contact</div>
  )
}
