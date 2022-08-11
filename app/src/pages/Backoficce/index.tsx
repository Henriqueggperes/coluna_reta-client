import './style.css'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Home from '../../components/Home'

const Backoficce = () => {
  return (
      <main className='backoficce_main-container'>
         <Header/>
         <section className='backoficce_content-container'>
           <Navbar/>
           <section className='backoficce-content'>
             <Home/>
           </section>
         </section>
      </main>
    )
}

export default Backoficce