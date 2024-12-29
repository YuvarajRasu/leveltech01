// import React from 'react';
// import classnames from 'classnames';
// import { usePagination, DOTS } from './usePagination'
// import '../assests/css/pagination.css';
// const Pagination = (props:any) => {
//     const {
//         onPageChange,
//         totalCount,
//         siblingCount = 1,
//         currentPage,
//         pageSize,
//         className
//     } = props;

//     const paginationRange = usePagination({
//         currentPage,
//         totalCount,
//         siblingCount,
//         pageSize
//     });

//     // || paginationRange.length < 2
//     if (currentPage === 0 ) {
//         return null;
//     }

//     const onNext = () => {
//         onPageChange(currentPage + 1);
//     };

//     const onPrevious = () => {
//         onPageChange(currentPage - 1);
//     };

//     let lastPage = paginationRange[paginationRange.length - 1];
//     return (
//         <ul
//             className={classnames('pagination-container', { [className]: className })}
//         >
//             <li
//                 className={classnames('pagination-item', {
//                     disabled: currentPage === 1
//                 })}
//                 onClick={onPrevious}
//             >
//                 {/* <i className="fa fa-chevron-left" aria-hidden="true"></i> */}
//                 <div className="arrow left" />


//             </li>
//             {paginationRange.map((pageNumber, i) => {
//                 if (pageNumber === DOTS) {
//                     return <li key={i} className="pagination-item dots">&#8230;</li>;
//                 }

//                 return (
//                     <li key={i}
//                         className={classnames('pagination-item', {
//                             selected: pageNumber === currentPage
//                         })}
//                         onClick={() => onPageChange(pageNumber)}
//                     >
//                         {pageNumber}
//                     </li>
//                 );
//             })}
//             <li
//                 className={classnames('pagination-item', {
//                     disabled: currentPage === lastPage
//                 })}
//                 onClick={onNext}
//             >
//                 <div className="arrow right" ></div>
//                 {/* <i className="fa fa-chevron-right" aria-hidden="true"></i> */}

//             </li>
//         </ul>
//     );
// };

// export default Pagination;
