import { useAtomValue } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { selectModeAtom } from '../../store/store'
import SearchKeyword from './components/SearchKeyword'
import SearchRange from './components/SearchRange'
import SearchSelect from './components/SearchSelect'
import SearchStar from './components/SearchStar'
import SearchText from './components/SearchText'
import SearchToggleButton from './components/SearchToggleButton'

const Search = () => {
  const [isShow, setIsShow] = useState(true)

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
  const [isEnabledEnv, setIsEnabledEnv] = useState(false)

  const [hostTaxon, setHostTaxon] = useState('')
  const [isEnabledHostTaxon, setIsEnabledHostTaxon] = useState(false)
  const [hostDisease, setHostDisease] = useState('')
  const [isEnabledHostDisease, setIsEnabledHostDisease] = useState(false)
  const [hostLocation, setHostLocation] = useState('')
  const [isEnabledHostLocation, setIsEnabledHostLocation] = useState(false)
  const [temperature, setTemperature] = useState(50)
  const [isEnabledTemp, setIsEnabledTemp] = useState(false)
  const [ph, setPh] = useState(0)
  const [isEnabledPh, setIsEnabledPh] = useState(false)

  const [genomeTaxon, setGenomeTaxon] = useState('')
  const [isEnabledGenomeTaxon, setIsEnabledGenomeTaxon] = useState(false)
  const genomeCategories = ['Isolate complete', 'Isolate draft', 'MAG high quality', 'MAG low quality']
  const [genomeCategory, setGenomeCategory] = useState('')
  const [isEnabledGenomeCategory, setIsEnabledGenomeCategory] = useState(false)
  const magSources = ['INSDC', 'MGnify', 'Other DBs', 'Original']
  const [magSource, setMagSource] = useState('')
  const [isEnabledMagSource, setIsEnabledMagSource] = useState(false)
  const [magCompleteness, setMagCompleteness] = useState(50)
  const [isEnabledMagCompleteness, setIsEnabledMagCompleteness] = useState(false)

  const searchProject = () => {
    const queries: { [key: string]: string } = {}
    if (keyword) {
      queries['q'] = keyword
    }
    if (isEnabledEnv) {
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
    if (isEnabledGenomeTaxon) {
      queries['genomeTaxon'] = genomeTaxon
    }
    if (isEnabledGenomeCategory) {
      queries['genomeCategory'] = genomeCategory
    }
    if (isEnabledMagSource) {
      queries['magSource'] = magSource
    }
    if (isEnabledMagCompleteness) {
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
            <SearchSelect
              heading='Environment'
              value={selectedEnv}
              setValue={setSelectedEnv}
              isEnabled={isEnabledEnv}
              setIsEnabled={setIsEnabledEnv}
              selectItems={environments}
            />

            {selectMode === 'genome' && (
              <SearchText
                heading='Genome taxon'
                value={genomeTaxon}
                setValue={setGenomeTaxon}
                isEnabled={isEnabledGenomeTaxon}
                setIsEnabled={setIsEnabledGenomeTaxon}
              />
            )}

            {selectMode === 'genome' && (
              <SearchSelect
                heading='Genome Category'
                value={genomeCategory}
                setValue={setGenomeCategory}
                isEnabled={isEnabledGenomeCategory}
                setIsEnabled={setIsEnabledGenomeCategory}
                selectItems={genomeCategories}
              />
            )}

            {selectMode === 'genome' && (
              <SearchSelect
                heading='MAG source'
                value={magSource}
                setValue={setMagSource}
                isEnabled={isEnabledMagSource}
                setIsEnabled={setIsEnabledMagSource}
                selectItems={magSources}
              />
            )}

            {selectMode === 'genome' && (
              <SearchRange
                heading='MAG completeness'
                value={magCompleteness}
                setValue={setMagCompleteness}
                isEnabled={isEnabledMagCompleteness}
                setIsEnabled={setIsEnabledMagCompleteness}
                min={40}
                max={100}
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

            <SearchStar />

            <button type='submit' className='side-menu__submit' onClick={() => searchProject()}>SUBMIT</button>
          </nav>
        </nav>
      </div>
    </div>
  )
}
export default Search
