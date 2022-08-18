import './style.css'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Home from '../../components/Home'
import React from 'react'
import Lists from '../../components/Lists'
import { useState } from 'react'
import { render } from 'react-dom'
import { toast, ToastContainer } from 'react-toastify'


const Backoficce = () => {
  
  const jwt =  localStorage.getItem('jwt')
  
  if(!jwt){
    toast.error('',{
      position: toast.POSITION.TOP_RIGHT,
      className:"toast-class",
      closeButton: false,
      delay: 5000,
    })
  }

  const [currentOption,setCurrentOption] = useState<string>("")
  const getCurrentOption = (option:string)=>{
    setCurrentOption(option);
  }
  return (
      <main className='backoficce_main-container'>
         <Header/>
         <section className='backoficce_content-container'>
           <Navbar 
           navOptionSelected = {getCurrentOption}
           />
           <section className='backoficce-content'>
             {currentOption? <Lists navOption={currentOption}/>: <Home/>}
           </section>
         </section>
      </main>
    )
}

export default Backoficce