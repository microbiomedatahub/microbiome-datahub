import {useAtomValue, useSetAtom} from 'jotai'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {selectedGenomeIdsAtom, selectedProjectIdsAtom, selectModeAtom} from '../../store/store'
import SearchKeyword from './components/SearchKeyword'
import SearchRange from './components/SearchRange'
import SearchRangeMinMax from './components/SearchRangeMinMax'
import SearchSelect from './components/SearchSelect'
import SearchStar from './components/SearchStar'
import SearchText from './components/SearchText'
import SearchCheckString from './components/SearchCheckString'
import SearchToggleButton from './components/SearchToggleButton'
import SearchSelectAutocomplete from './components/SearchSelectAutocomplete'
import {GenomeEnvironmentList} from '../../constants/genomeEnvironmentList'

const Search = () => {
  const [isShow, setIsShow] = useState(true)

  const selectMode = useAtomValue(selectModeAtom)

  const [keyword, setKeyword] = useState('')

  const [environments] = useState<Array<string>>([
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
  const [environmentsGenome] = useState<Array<string>>([
    'activated sludge',
    'feces',
    'freshwater',
    'ground water',
    'hot spring',
    'hydrothermal vent',
    'marine water',
    'rumen',
    'sediment',
    'soil',
  ])
  const [selectedEnvGenome, setSelectedEnvGenome] = useState('activated sludge')
  const [isEnabledEnvGenome, setIsEnabledEnvGenome] = useState(false)
  const [hostTaxon, setHostTaxon] = useState('')
  // const [hostDisease, setHostDisease] = useState('')
  // const [isEnabledHostDisease, setIsEnabledHostDisease] = useState(false)
  // const [hostLocation, setHostLocation] = useState('')
  // const [isEnabledHostLocation, setIsEnabledHostLocation] = useState(false)
  // const [temperature, setTemperature] = useState(50)
  // const [isEnabledTemp, setIsEnabledTemp] = useState(false)
  // const [ph, setPh] = useState(0)
  // const [isEnabledPh, setIsEnabledPh] = useState(false)
  const [magCompleteness, setMagCompleteness] = useState(50)
  const [isEnabledMagCompleteness, setIsEnabledMagCompleteness] = useState(false)
  const [optimumTmpMin, setOptimumTmpMin] = useState(0)
  const [optimumTmpMax, setOptimumTmpMax] = useState(150)
  const [isEnabledOptimumTmp, setIsEnabledOptimumTmp] = useState(false)
  const [doublingHMin, setDoublingHMin] = useState(0)
  const [doublingHMax, setDoublingHMax] = useState(150)
  const [isEnabledDoublingH, setIsEnabledDoublingH] = useState(false)
  const [optimumPhMin, setOptimumPhMin] = useState(1)
  const [optimumPhMax, setOptimumPhMax] = useState(14)
  const [isEnabledOptimumPh, setIsEnabledOptimumPh] = useState(false)
  const [genomeTaxon, setGenomeTaxon] = useState('')
  const [quality, setQuality] = useState([0,1,2,3,4,5])
  const dataSources: CheckItemString[] = [
    { id: 'INSDC', name: 'dataSource_INSDC', displayValue: 'INSDC MAG', value: 'INSDC' },
    { id: 'RefSeq', name: 'dataSource_RefSeq', displayValue: 'Isolate Genome', value: 'RefSeq' },
  // { id: 'MGnify', name: 'dataSource_MGnify', displayValue: '"MGnify MAG', value: 'MGnify' },todo データが入ったら追加する
  ]
  const [dataSource, setDataSource] = useState(dataSources.map((ds) => ds.value))
  const setSelectedGenomeIds = useSetAtom(selectedGenomeIdsAtom)
  const setSelectedProjectIds = useSetAtom(selectedProjectIdsAtom)

  const searchProject = () => {
    if (selectMode === 'genome') {
      setSelectedGenomeIds([])
    } else {
      setSelectedProjectIds([])
    }
    const queries: { [key: string]: string } = {}
    if (keyword) {
      queries['q'] = keyword
    }
    if (selectMode === 'project' && isEnabledEnv) {
      queries['env'] = selectedEnv
    }
    if (selectMode === 'genome' && isEnabledEnvGenome) {
      queries['envGenome'] = selectedEnvGenome
    }
    if (hostTaxon) {
      queries['hostTaxon'] = hostTaxon
    }
    // if (isEnabledHostDisease) {
    //   queries['hostDisease'] = hostDisease
    // }
    // if (isEnabledHostLocation) {
    //   queries['hostLoc'] = hostLocation
    // }
    // if (isEnabledTemp) {
    //   queries['temp'] = temperature.toString()
    // }
    // if (isEnabledPh) {
    //   queries['ph'] = ph.toString()
    // }
    if (isEnabledMagCompleteness) {
      queries['magCompleteness'] = magCompleteness.toString()
    }
    if (isEnabledOptimumTmp) {
      queries['optimumTmpMin'] = optimumTmpMin.toString()
      queries['optimumTmpMax'] = optimumTmpMax.toString()
    }
    if (isEnabledDoublingH) {
      queries['doublingHMin'] = doublingHMin.toString()
      queries['doublingHMax'] = doublingHMax.toString()
    }
    if (isEnabledOptimumPh) {
      queries['optimumPhMin'] = optimumPhMin.toString()
      queries['optimumPhMax'] = optimumPhMax.toString()
    }
    if (genomeTaxon) {
      queries['genomeTaxon'] = genomeTaxon
    }
    if (selectMode === 'genome'&& quality && quality.length > 0) {
      queries['quality'] = quality.join(',')
    }
    if (selectMode === 'genome' && dataSource && dataSource.length > 0) {
      queries['dataSource'] = dataSource.join(',')
    }

    setSearchParams({
      ...queries,
    })
  }

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('q')) {
      setKeyword(searchParams.get('q') ?? '')
    }
    if (searchParams.get('env')) {
      setSelectedEnv(searchParams.get('env') ?? '')
    }
    if (searchParams.get('envGenome')) {
      setSelectedEnvGenome(searchParams.get('envGenome') ?? '')
    }
    if (searchParams.get('hostTaxon')) {
      setHostTaxon(searchParams.get('hostTaxon') ?? '')
    }
    // if (searchParams.get('hostDisease')) {
    //   setHostDisease(searchParams.get('hostDisease') ?? '')
    // }
    // if (searchParams.get('hostLoc')) {
    //   setHostLocation(searchParams.get('hostLoc') ?? '')
    // }
    // if (searchParams.get('temp')) {
    //   setTemperature(parseInt(searchParams.get('temp') ?? ''))
    // }
    // if (searchParams.get('ph')) {
    //   setPh(parseInt(searchParams.get('ph') ?? ''))
    // }
    if (searchParams.get('quality')) {
      setQuality((searchParams.get('quality') ?? '0').split(',').map((item) => parseInt(item)))
    }
    if (searchParams.get('genomeTaxon')) {
      setGenomeTaxon(searchParams.get('genomeTaxon') ?? '')
    }
    if (searchParams.get('magCompleteness')) {
      setMagCompleteness(parseInt(searchParams.get('magCompleteness') ?? ''))
    }
    if (searchParams.get('optimumTmpMin')) {
      setOptimumTmpMin(parseInt(searchParams.get('optimumTmpMin') ?? '0'))
    }
    if (searchParams.get('optimumTmpMax')) {
      setOptimumTmpMax(parseInt(searchParams.get('optimumTmpMax') ?? '150'))
    }
    if (searchParams.get('doublingHMin')) {
      setDoublingHMin(parseInt(searchParams.get('doublingHMin') ?? '0'))
    }
    if (searchParams.get('doublingHMax')) {
      setDoublingHMax(parseInt(searchParams.get('doublingHMax') ?? '150'))
    }
    if (searchParams.get('optimumPhMin')) {
      setOptimumPhMin(parseInt(searchParams.get('optimumPhMin') ?? '1'))
    }
    if (searchParams.get('optimumPhMax')) {
      setOptimumPhMax(parseInt(searchParams.get('optimumPhMax') ?? '14'))
    }
    if (searchParams.get('dataSource')) {
      setDataSource((searchParams.get('dataSource') ?? '').split(',').map((item) => item))
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
            <button type='submit' className='side-menu__submit' onClick={() => searchProject()}>SUBMIT</button>
            {selectMode === 'project' && (
              <SearchSelect
                heading='Environment'
                value={selectedEnv}
                setValue={setSelectedEnv}
                isEnabled={isEnabledEnv}
                setIsEnabled={setIsEnabledEnv}
                selectItems={environments}
              />
            )}

            {selectMode === 'genome' && (
              <SearchSelectAutocomplete
                heading='Environment'
                value={selectedEnvGenome}
                setValue={setSelectedEnvGenome}
                isEnabled={isEnabledEnvGenome}
                setIsEnabled={setIsEnabledEnvGenome}
                selectItems={environmentsGenome}
                options={GenomeEnvironmentList}
              />
            )}

            {selectMode === 'genome' && (
              <SearchText
                heading='Genome taxon'
                value={genomeTaxon}
                setValue={setGenomeTaxon}
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

            {selectMode === 'genome' && (
              <SearchRangeMinMax
                heading='Optimum temperature (℃)'
                minValue={optimumTmpMin}
                setMinValue={setOptimumTmpMin}
                maxValue={optimumTmpMax}
                setMaxValue={setOptimumTmpMax}
                isEnabled={isEnabledOptimumTmp}
                setIsEnabled={setIsEnabledOptimumTmp}
                min={0}
                max={150}
              />
            )}

            {selectMode === 'genome' && (
              <SearchRangeMinMax
                heading='Doubling time (h)'
                minValue={doublingHMin}
                setMinValue={setDoublingHMin}
                maxValue={doublingHMax}
                setMaxValue={setDoublingHMax}
                isEnabled={isEnabledDoublingH}
                setIsEnabled={setIsEnabledDoublingH}
                min={0}
                max={150}
              />
            )}

            {selectMode === 'genome' && (
              <SearchRangeMinMax
                heading='Optimum pH'
                minValue={optimumPhMin}
                setMinValue={setOptimumPhMin}
                maxValue={optimumPhMax}
                setMaxValue={setOptimumPhMax}
                isEnabled={isEnabledOptimumPh}
                setIsEnabled={setIsEnabledOptimumPh}
                min={1}
                max={14}
              />
            )}

            <SearchText
              heading='Host taxon'
              value={hostTaxon}
              setValue={setHostTaxon}
            />

            {/* <SearchText
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
 */}
            {selectMode === 'genome'
              && (
                <SearchStar
                  value={quality}
                  setValue={setQuality}
                />
              )}

            {selectMode === 'genome'
              && (
                <SearchCheckString
                  heading={'Data Source'}
                  value={dataSource}
                  setValue={setDataSource}
                  checkItems={dataSources}
                />
              )}

            <button type='submit' className='side-menu__submit' onClick={() => searchProject()}>SUBMIT</button>
          </nav>
        </nav>
      </div>
    </div>
  )
}
export default Search
