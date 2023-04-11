import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GenomeItems from '../components/GenomeItems'
import SearchForm from '../components/SearchForm'
import { selectModeAtom } from '../store/store'

const GenomeList = () => {
  const [selectMode, setSelectMode] = useAtom(selectModeAtom)

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

      <SearchForm />

      <GenomeItems />
    </main>
  )
}

export default GenomeList
