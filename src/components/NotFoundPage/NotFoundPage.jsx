import React from 'react'
import notFoundImg from '../../assets/images/not-found.webp'

export default function NotFoundPage() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height: '90vh'}}>
        <img src={notFoundImg} alt="" />
    </div>
  )
}
