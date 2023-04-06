import { useMemo } from 'react'

const Pagination = ({ currentPage, lastPage }: { currentPage: number; lastPage: number }) => {
  const paginationCurrentPage = (index: number) => {
    return 'pagination__item' + (currentPage === index ? ' current' : '')
  }
  const paginationItems: Array<number> = useMemo(() => {
    const paginationList = []
    for (let i = 2; i < lastPage; i++) {
      paginationList.push(i)
    }
    return paginationList
  }, [lastPage, currentPage])

  return (
    <ol className='pagination' aria-label='ページャー'>
      <li className={paginationCurrentPage(1)} key='1'>
        1
      </li>
      {currentPage >= 4 && (
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
      )}
      {paginationItems.map((item: number) => {
        return <li className={paginationCurrentPage(item)} key={item}>{item}</li>
      })}
      {currentPage + 1 !== lastPage && (
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
      )}
      <li className={paginationCurrentPage(lastPage)} key={lastPage}>{lastPage}</li>
    </ol>
  )
}

export default Pagination
