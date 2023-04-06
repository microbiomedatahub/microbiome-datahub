import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GenomeItems from '../components/GenomeItems'
import { resultCountAtom, selectModeAtom, totalAtom } from '../store/store'

const GenomeList = () => {
  const [selectMode, setSelectMode] = useAtom(selectModeAtom)
  const resultCount = useAtomValue(resultCountAtom)
  const total = useAtomValue(totalAtom)

  useEffect(() => {
    setSelectMode('genome')
  }, [])

  return (
    <main className='app-main'>
      <nav>
        <ul className='tab-navigation'>
          <li className={`tab-navigation__link${selectMode === 'project' ? ' current' : ''}`}>
            {selectMode !== 'project' ? <Link to='/projects'>PROJECT</Link> : 'PROJECT'}
          </li>
          <li className={`tab-navigation__link${selectMode === 'genome' ? ' current' : ''}`}>
            {selectMode !== 'genome' ? <Link to='/genomes'>GENOME</Link> : 'GENOME'}
          </li>
        </ul>
      </nav>

      <form action='' className='search'>
        <p className='search__results-number'>
          {`${resultCount} / ${total}`}
        </p>
        <input type='search' className='search__input' placeholder='Search Keyword' />
        <label htmlFor='sort' className='search__sort-label'>order by</label>
        <select name='sortType' id='sort' className='search__sort-select'>
          <option value='Genome ID'>Genome ID</option>
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

      <GenomeItems />
    </main>
  )
}

export default GenomeList
