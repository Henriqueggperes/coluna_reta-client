import './style.css'

const StudentModal = () => {
  return (
    <section className="student-modal--container">
        <form action="">
            <input name='name' type="text" className="student-modal-form--input" />
            <input name='birth_date' type="text" className="student-modal-form--input" />
            <input name='phone' type="text" className="student-modal-form--input" />
            <input name='institution_id' type="text" className="student-modal-form--input" />
            <input name='address_id' type="text" className="student-modal-form--input" />
            <button className='send--button'>CRIAR</button>
        </form>
    </section>
  )
}

export default StudentModal