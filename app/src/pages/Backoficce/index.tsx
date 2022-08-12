import './style.css'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Home from '../../components/Home'
import Alunos from '../../components/StudentsList'



const Backoficce = () => {
  return (
      <main className='backoficce_main-container'>
         <Header/>
         <section className='backoficce_content-container'>
           <Navbar/>
           <section className='backoficce-content'>
               <Alunos></Alunos>
           </section>
         </section>
      </main>
    )
}

export default Backoficce