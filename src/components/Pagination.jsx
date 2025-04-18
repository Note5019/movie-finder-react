import React from 'react'

const Pagination = ({currentPage = 1, totalPage = 1, nextPage, previousPage}) => {
    return (
        <div className="pagination">
            <button className="arrow" onClick={() => previousPage()}>
                <img src="arrow-icon.svg" alt="Previous page" className="rotate-180"/>
            </button>

            <div className="page">
                {currentPage} <span className="text-gray-500">/ {totalPage}</span>
            </div>

            <button className="arrow"  onClick={() => nextPage()}>
                <img src="arrow-icon.svg" alt="Next page"/>
            </button>
        </div>
    )
}
export default Pagination
