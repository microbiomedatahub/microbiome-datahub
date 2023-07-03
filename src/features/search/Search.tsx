import { useAtomValue } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GenomeCategory from '../../components/GenomeCategory'
import { selectModeAtom } from '../../store/store'
import SearchKeyword from './components/SearchKeyword'
import SearchRange from './components/SearchRange'
import SearchText from './components/SearchText'
import SearchToggleButton from './components/SearchToggleButton'

const Search = () => {
  const [isShow, setIsShow] = useState(false)

  const selectMode = useAtomValue(selectModeAtom)

  const [keyword, setKeyword] = useState('')

  const [environments, setEnvironments] = useState<Array<string>>([
    'soil',
    'marine',
    'freshwater',
    'hot spring',
    'sediment',
    'air',
    'gut',
    'oral',
    'skin',
    'reproductive system',
    'human activity related',
  ])

  const [selectedEnv, setSelectedEnv] = useState('soil')
  const handleEnv = (env: string) => {
    setSelectedEnv(selectedEnv === env ? '' : env)
  }

  const [hostTaxon, setHostTaxon] = useState('')
  const [isEnabledHostTaxon, setIsEnabledHostTaxon] = useState(true)
  const [hostDisease, setHostDisease] = useState('')
  const [isEnabledHostDisease, setIsEnabledHostDisease] = useState(true)
  const [hostLocation, setHostLocation] = useState('')
  const [isEnabledHostLocation, setIsEnabledHostLocation] = useState(true)
  const [temperature, setTemperature] = useState(50)
  const [isEnabledTemp, setIsEnabledTemp] = useState(true)
  const [ph, setPh] = useState(0)
  const [isEnabledPh, setIsEnabledPh] = useState(true)

  const [genomeTaxon, setGenomeTaxon] = useState('')
  const [genomeCategory, setGenomeCategory] = useState('')
  const [magSource, setMagSource] = useState('')
  const [magCompleteness, setMagCompleteness] = useState(50)

  const searchProject = () => {
    const queries: { [key: string]: string } = {}
    if (keyword) {
      queries['q'] = keyword
    }
    if (selectedEnv) {
      queries['env'] = selectedEnv
    }
    if (isEnabledHostTaxon) {
      queries['hostTaxon'] = hostTaxon
    }
    if (isEnabledHostDisease) {
      queries['hostDisease'] = hostDisease
    }
    if (isEnabledHostLocation) {
      queries['hostLoc'] = hostLocation
    }
    if (isEnabledTemp) {
      queries['temp'] = temperature.toString()
    }
    if (isEnabledPh) {
      queries['ph'] = ph.toString()
    }
    if (genomeTaxon) {
      queries['genomeTaxon'] = genomeTaxon
    }
    if (genomeCategory) {
      queries['genomeCategory'] = genomeCategory
    }
    if (magSource) {
      queries['magSource'] = magSource
    }
    if (magCompleteness) {
      queries['magCompleteness'] = magCompleteness.toString()
    }

    setSearchParams({
      ...queries,
    })
  }

  const [searchParams, setSearchParams] = useSearchParams()

  const urlQuery = useMemo(() => {
    return `?${searchParams.toString()}`
  }, [searchParams])

  useEffect(() => {
    if (searchParams.get('q')) {
      setKeyword(searchParams.get('q') ?? '')
    }
    if (searchParams.get('env')) {
      setSelectedEnv(searchParams.get('env') ?? '')
    }
    if (searchParams.get('hostTaxon')) {
      setHostTaxon(searchParams.get('hostTaxon') ?? '')
    }
    if (searchParams.get('hostDisease')) {
      setHostDisease(searchParams.get('hostDisease') ?? '')
    }
    if (searchParams.get('hostLoc')) {
      setHostLocation(searchParams.get('hostLoc') ?? '')
    }
    if (searchParams.get('temp')) {
      setTemperature(parseInt(searchParams.get('temp') ?? ''))
    }
    if (searchParams.get('ph')) {
      setPh(parseInt(searchParams.get('ph') ?? ''))
    }
    if (searchParams.get('genomeTaxon')) {
      setGenomeTaxon(searchParams.get('genomeTaxon') ?? '')
    }
    if (searchParams.get('genomeCategory')) {
      setGenomeCategory(searchParams.get('genomeCategory') ?? '')
    }
    if (searchParams.get('magSource')) {
      setMagSource(searchParams.get('magSource') ?? '')
    }
    if (searchParams.get('magCompleteness')) {
      setMagCompleteness(parseInt(searchParams.get('magCompleteness') ?? ''))
    }
  }, [searchParams])

  return (
    <div className={`side-menu ${isShow ? 'open' : ''}`}>
      <SearchToggleButton isShow={isShow} setIsShow={setIsShow} />

      <div id='sideMenu' className='side-menu__navigation' aria-label='サイドメニュー'>
        <nav>
          <SearchKeyword
            keyword={keyword}
            setKeyword={setKeyword}
          />

          <nav id='projectMenu' className='side-menu__links'>
            <section className='side-menu__links__section'>
              <h2 className='side-menu__links__heading'>Environment</h2>
              {environments.map((item, index) => {
                return (
                  <p
                    key={index}
                    title={item}
                    className={`side-menu__links__item ${item === selectedEnv ? ' current' : ''}`}
                    onClick={() => handleEnv(item)}
                  >
                    {item}
                  </p>
                )
              })}
            </section>

            {selectMode === 'genome' && (
              <GenomeCategory
                genomeTaxon={genomeTaxon}
                setGenomeTaxon={setGenomeTaxon}
                magCompleteness={magCompleteness}
                setMagCompleteness={setMagCompleteness}
                genomeCategory={genomeCategory}
                setGenomeCategory={setGenomeCategory}
                magSource={magSource}
                setMagSource={setMagSource}
              />
            )}

            <SearchText
              heading='Host taxon'
              value={hostTaxon}
              setValue={setHostTaxon}
              isEnabled={isEnabledHostTaxon}
              setIsEnabled={setIsEnabledHostTaxon}
            />

            <SearchText
              heading='Host disease'
              value={hostDisease}
              setValue={setHostDisease}
              isEnabled={isEnabledHostDisease}
              setIsEnabled={setIsEnabledHostDisease}
            />

            <SearchText
              heading='Host Location'
              value={hostLocation}
              setValue={setHostLocation}
              isEnabled={isEnabledHostLocation}
              setIsEnabled={setIsEnabledHostLocation}
            />

            <SearchRange
              heading='Temperature'
              value={temperature}
              setValue={setTemperature}
              isEnabled={isEnabledTemp}
              setIsEnabled={setIsEnabledTemp}
              min={-30}
              max={130}
            />

            <SearchRange
              heading='pH'
              value={ph}
              setValue={setPh}
              isEnabled={isEnabledPh}
              setIsEnabled={setIsEnabledPh}
              min={0}
              max={15}
            />

            <button type='submit' className='side-menu__submit' onClick={() => searchProject()}>SUBMIT</button>
          </nav>
        </nav>
      </div>
    </div>
  )
}
export default Search
