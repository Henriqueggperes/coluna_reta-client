import "./style.css";

interface ItenProps {
  id: number;
  title: string;
  completed: boolean;
}

const PaginationComponent = ({ pages, currentPage, setCurrentPage }: any) => {
  return (
    <div className="paginationMainComp">
      {Array.from(Array(pages), (item, index) => {
        return (
          <div className="paginationComp">
            <button
              // style={index === currentPage ? {backgroundColor: "blue"} : undefined}
              className="paginationButton"
              value={index}
              onClick={(e: any) => setCurrentPage(Number(e.target.value))}
            >
              {index + 1}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PaginationComponent;