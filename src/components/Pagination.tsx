import { useMemo } from 'react'
import { Link } from 'react-router-dom'

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
  }, [lastPage])

  return (
    <ol className='pagination' aria-label='ページャー'>
      <li className={paginationCurrentPage(1)}>
        {currentPage !== 1 ? <Link to='?page=1'>1</Link> : 1}
      </li>
      {currentPage - 1 !== 1 && currentPage !== 1 && (
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
        return (
          <li className={paginationCurrentPage(item)} key={item}>
            {currentPage !== item ? <Link to={`?page=${item}`}>{item}</Link> : item}
          </li>
        )
      })}
      {currentPage + 1 !== lastPage && currentPage !== lastPage && (
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
      {lastPage !== 1 && <li className={paginationCurrentPage(lastPage)}>
        {currentPage !== lastPage ? <Link to={`?page=${lastPage}`}>{lastPage}</Link> : lastPage}
      </li>}
    </ol>
  )
}

export default Pagination
