import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { resultsCountTotalAtom, selectModeAtom } from '../store/store'
import { useSearchParams } from 'react-router-dom'

const SearchForm = () => {
  const countTotal = useAtomValue(resultsCountTotalAtom)
  const [orderBy, setOrderBy] = useState('projectId')
  const selectMode = useAtomValue(selectModeAtom)
  useEffect(() => {
    setOrderBy(
      selectMode + 'Id',
    )
  }, [selectMode])

  const [searchParams, setSearchParams] = useSearchParams()

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queries: {[key: string]: string} = {}
    searchParams.delete('q')
    for (const [key, value] of searchParams.entries()) {      
      queries[key] = value
    }
    console.log(e.currentTarget.value)
    if (e.currentTarget.value) {
      queries['q'] = e.currentTarget.value
    }
    setSearchParams(queries)
  }

  return (
    <form className='search'>
      <p className='search__results-number'>
        {countTotal.itemCount + ' / ' + countTotal.total}
      </p>
      <input
        type='search'
        className='search__input'
        placeholder='Search Keyword'
        onChange={(e) => handleKeyword(e)}
        value={searchParams.get('q') ?? ''}
      />
      <label htmlFor='sort' className='search__sort-label'>order by</label>
      <select
        name='sortType'
        id='sort'
        className='search__sort-select'
        onChange={(e) => setOrderBy(e.currentTarget.value)}
        value={orderBy}
      >
        {selectMode === 'project' && <option value='projectId'>Project ID</option>}
        {selectMode === 'genome' && <option value='genomeId'>Genome ID</option>}
      </select>
      <div className='search__order'>
        <button value='' className='search__order__button active'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'>
            <path d='M10.59 7.42L6 2.83L1.41 7.42L0 6L6 -1.90735e-06L12 6L10.59 7.42Z' fill='#D9D9D9' />
          </svg>
        </button>
        <button value='' className='search__order__button'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'>
            <path d='M1.41 0.580002L6 5.17L10.59 0.580002L12 2L6 8L0 2L1.41 0.580002Z' fill='#D9D9D9' />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchForm
