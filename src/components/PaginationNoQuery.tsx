const FirstPagination = ({ currentPage, handleChangeCurrentPage }: { currentPage: number, handleChangeCurrentPage: (page: number) => void }) => {
  if (currentPage === 1) {
    return <li className='pagination__item current'>1</li>
  } else {
    return <li className='pagination__item' onClick={() => handleChangeCurrentPage(1)}>1</li>
  }
}

const FirstDot = (
  { currentPage, lastPage }: { currentPage: number; lastPage: number },
) => {
  if (lastPage < 4 || currentPage < 3) {
    return null
  }

  return (
    <>
      <div className='pagination__item dot'>
        <svg viewBox='0 0 31 4' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='2' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='11' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='20' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='29' cy='2' r='2' fill='#D9D9D9' />
        </svg>
      </div>
    </>
  )
}

const CenterPaginationItems = (
  { currentPage, lastPage, handleChangeCurrentPage }: { currentPage: number; lastPage: number, handleChangeCurrentPage: (page: number) => void },
) => {
  if (lastPage < 3) {
    return null
  }

  const paginationNumbers = [currentPage - 1, currentPage, currentPage + 1].filter((item) =>
    item > 1 && item < lastPage
  )

  return (
    <>
      {paginationNumbers.map((item) => {
        if (item === currentPage) {
          return <li key={item} className='pagination__item current'>{item}</li>
        } else {
          return <li className='pagination__item' key={item} onClick={() => handleChangeCurrentPage(item)}>{item}</li>
        }
      })}
    </>
  )
}

const LastDot = (
  { currentPage, lastPage }: { currentPage: number; lastPage: number },
) => {
  if (lastPage < 4 || ((currentPage + 1) === lastPage || currentPage === lastPage)) {
    return null
  }

  return (
    <>
      <div className='pagination__item dot'>
        <svg viewBox='0 0 31 4' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='2' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='11' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='20' cy='2' r='2' fill='#D9D9D9' />
          <circle cx='29' cy='2' r='2' fill='#D9D9D9' />
        </svg>
      </div>
    </>
  )
}

const LastPagination = ({ currentPage, lastPage, handleChangeCurrentPage }: { currentPage: number; lastPage: number, handleChangeCurrentPage: (page: number) => void }) => {
  if (lastPage === 1) {
    return null
  }

  if (currentPage === lastPage) {
    return <li className='pagination__item current'>{lastPage}</li>
  } else {
    return <li className='pagination__item' onClick={() => handleChangeCurrentPage(lastPage)}>{lastPage}</li>
  }
}

const PaginationNoQuery = ({ currentPage, lastPage, handleChangeCurrentPage }: { currentPage: number; lastPage: number, handleChangeCurrentPage: (page: number) => void }) => {
  return (
    <ol className='pagination' aria-label='ページャー'>
      <FirstPagination currentPage={currentPage} handleChangeCurrentPage={handleChangeCurrentPage}/>
      <FirstDot currentPage={currentPage} lastPage={lastPage} />
      <CenterPaginationItems currentPage={currentPage} lastPage={lastPage} handleChangeCurrentPage={handleChangeCurrentPage}/>
      <LastDot currentPage={currentPage} lastPage={lastPage} />
      <LastPagination currentPage={currentPage} lastPage={lastPage} handleChangeCurrentPage={handleChangeCurrentPage}/>
    </ol>
  )
}

export default PaginationNoQuery
