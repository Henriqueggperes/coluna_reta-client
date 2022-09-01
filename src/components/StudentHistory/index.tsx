import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import studentsService from "../../services/studentsService";
import { MetaType, studentHistory } from "../../types/types";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./style.css";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import RegisterVisitModal from "../RegisterVisitModal";

const StudentHistory = () => {
  useEffect(() => {
    getStudentHistory(1);
  }, []);

  const params = useParams();

  const id = params.id;

  const [studentHistory, setStudentHistory] = useState<studentHistory[]>([]);
  
  const [metaData, setMetaData] = useState<MetaType>({
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 1,
    orderByColumn: "",
    page: 1,
    pageCount: 1,
    take: 1,
  });

  const [isVisitModalOpen,setIsVisitModalOpen] = useState<boolean>(false)
  
  const handleVisitModal = ()=>{
    setIsVisitModalOpen(!isVisitModalOpen)
  }


  const getStudentHistory = async (page: number) => {
    const response = await studentsService.getVisitsHistory(Number(id), page);
    if (response.data.message) {
      toast.error(response.data.message);
    }
    setStudentHistory(
      response.data.data.sort((a: studentHistory, b: studentHistory) => {
        if (a.id < b.id) {
          return 1;
        } else {
          return -1;
        }
      })
    );
    setMetaData(response.data.meta);
  };

  const handleClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    getStudentHistory(page);
  };

  return (
    <>
      <section className="student-visits-history--container">
        <div className="register-visit-icon--container">
          <AiOutlinePlusSquare onClick={()=>handleVisitModal()} className="register-visit--icon" />
        </div>
        {studentHistory?.map((visit) => (
          <div className="student-visit--card">
            <div className="student-visit-card--id">ID: {visit.id}</div>
            <section className="student-visit-card-infos--container">
              <div className="student-visit--infos">
                <div className="student-visit--info">
                  <label className="visit-info--label">Data da visita</label>
                  <span className="visit-info--span">{visit.visit_date}</span>
                </div>

                <div className="student-visit--info">
                  <label className="visit-info--label">Encaminhamento</label>
                  <span className="visit-info--span">{visit.forwarding}</span>
                </div>

                <div className="student-visit--info">
                  <label className="visit-info--label">Angulo de Cobb</label>
                  <span className="visit-info--span">{visit.cobb_angle}</span>
                </div>

                <div className="student-visit--info">
                  <label className="visit-info--label">Data de retorno</label>
                  <span className="visit-info--span">{visit.return_date}</span>
                </div>

                <div className="student-visit--info">
                  <label className="visit-info--label">
                    Ultima atualização
                  </label>
                  <span className="visit-info--span">{visit.updated_at}</span>
                </div>

                <div className="student-visit--info">
                  <label className="visit-info--label">
                    Consultas marcadas
                  </label>
                  <span className="visit-info--span">
                    {visit.consultation.map((consultation) => (
                      <div>1</div>
                    ))}
                  </span>
                </div>
              </div>
              <div className="student-visit--images">
                <div className="studen-visit--image">
                  <img className="student-image" src={visit.image_1} alt="" />
                </div>
                <div className="studen-visit--image">
                  <img className="student-image" src={visit.image_2} alt="" />
                </div>
              </div>

            </section>
          </div>
        ))}
      </section>
      <div className="pagination-visit-comp">
        <ReactPaginate
          pageCount={metaData.pageCount}
          nextLabel={">"}
          previousLabel={"<"}
          breakLabel={"..."}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={(selectedItem: { selected: number }) =>
            handleClick(selectedItem)
          }
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
      {isVisitModalOpen?<RegisterVisitModal closeModal={handleVisitModal}/> :''}
    </>
  );
};

export default StudentHistory;
