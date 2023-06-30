import { useAtomValue } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { selectModeAtom } from '../store/store'
import GenomeCategory from './GenomeCategory'

const SideMenu = () => {
  const [isShow, setIsShow] = useState(false)
  const handleToggleButtonClick = () => {
    setIsShow(!isShow)
  }

  const selectMode = useAtomValue(selectModeAtom)

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
  const [hostDisease, setHostDisease] = useState('')
  const [hostLocation, setHostLocation] = useState('')
  const [temperature, setTemperature] = useState(50)
  const [ph, setPh] = useState(0)

  const [genomeTaxon, setGenomeTaxon] = useState('')
  const [genomeCategory, setGenomeCategory] = useState('')
  const [magSource, setMagSource] = useState('')
  const [magCompleteness, setMagCompleteness] = useState(50)

  const searchProject = () => {
    const queries: {[key:string]: string} = {}
    if (selectedEnv) {
      queries['env'] = selectedEnv
    }
    if (hostTaxon) {
      queries['hostTaxon'] = hostTaxon
    }
    if (hostDisease) {
      queries['hostDisease'] = hostDisease
    }
    if (hostLocation) {
      queries['hostLoc'] = hostLocation
    }
    if (temperature) {
      queries['temp'] = temperature.toString()
    }
    if (ph) {
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

    if (searchParams.get('q')) {
      queries['q'] = searchParams.get('q') as string
    }

    setSearchParams({
      ...queries,
    })
  }

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

  const [searchParams, setSearchParams] = useSearchParams()

  const urlQuery = useMemo(() => {
    return `?${searchParams.toString()}`
  }, [searchParams])

  useEffect(() => {
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

  // @ts-ignore
  return (
    <div className={`side-menu ${isShow ? 'open' : ''}`}>
      <button
        id='sideMenuSwitch'
        aria-controls='sideMenu'
        className='side-menu__switch'
        onClick={handleToggleButtonClick}
      >
        {isShow
          ? (
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <desc>グローバルメニューの閉じるボタン</desc>
              <path
                d='M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z'
                fill='#9F9F9F'
              />
            </svg>
          )
          : (
            <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <desc>グローバルメニューの開くボタン</desc>
              <path
                d='M6.5 0C8.22391 0 9.87721 0.684819 11.0962 1.90381C12.3152 3.12279 13 4.77609 13 6.5C13 8.11 12.41 9.59 11.44 10.73L11.71 11H12.5L17.5 16L16 17.5L11 12.5V11.71L10.73 11.44C9.59 12.41 8.11 13 6.5 13C4.77609 13 3.12279 12.3152 1.90381 11.0962C0.684819 9.87721 0 8.22391 0 6.5C0 4.77609 0.684819 3.12279 1.90381 1.90381C3.12279 0.684819 4.77609 0 6.5 0ZM6.5 2C4 2 2 4 2 6.5C2 9 4 11 6.5 11C9 11 11 9 11 6.5C11 4 9 2 6.5 2Z'
                fill='white'
              />
            </svg>
          )}
      </button>

      <div id='sideMenu' className='side-menu__navigation' aria-label='サイドメニュー'>
        <div tabIndex={0}></div>
        <nav>
          <div className="side-menu__keyword">
            <input
              type='search'
              className='side-menu__keyword__input'
              placeholder='Search Keyword'
              onChange={(e) => handleKeyword(e)}
              value={searchParams.get('q') ?? ''}
            />
          </div>

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

            { selectMode === 'genome' && <GenomeCategory
              genomeTaxon={genomeTaxon}
              setGenomeTaxon={setGenomeTaxon}
              magCompleteness={magCompleteness}
              setMagCompleteness={setMagCompleteness}
              genomeCategory={genomeCategory}
              setGenomeCategory={setGenomeCategory}
              magSource={magSource}
              setMagSource={setMagSource}
            /> }

            <section className='side-menu__links__section'>
              <div className="side-menu__links__section__header">
                <label htmlFor="hostTaxon" className='side-menu__links__heading'>Host taxon</label>
                <input id="hostTaxonSwitch" type="checkbox" className="g-switch"/>
                <label htmlFor="hostTaxonSwitch" className="g-switch__button"/>
              </div>
              <input
                type='text'
                id="hostTaxon"
                placeholder='Host taxon name'
                className='side-menu__links__input'
                value={hostTaxon}
                disabled={true}
                onChange={(e) => setHostTaxon(e.currentTarget.value)}
              />
            </section>

            <section className='side-menu__links__section'>
              <div className="side-menu__links__section__header">
                <label htmlFor="hostDisease" className='side-menu__links__heading'>Host disease</label>
                <input id="hostDiseaseSwitch" type="checkbox" className="g-switch"/>
                <label htmlFor="hostDiseaseSwitch" className="g-switch__button"/>
              </div>
              <input
                type='text'
                id="hostDisease"
                className='side-menu__links__input'
                value={hostDisease}
                disabled={true}
                onChange={(e) => setHostDisease(e.currentTarget.value)}
              />
            </section>

            <section className='side-menu__links__section'>
              <div className="side-menu__links__section__header">
                <label htmlFor="hostLocation" className='side-menu__links__heading'>Host location</label>
                <input id="hostLocationSwitch" type="checkbox" className="g-switch"/>
                <label htmlFor="hostLocationSwitch" className="g-switch__button"/>
              </div>
              <input
                type='text'
                id="hostLocation"
                className='side-menu__links__input'
                value={hostLocation}
                disabled={true}
                onChange={(e) => setHostLocation(e.currentTarget.value)}
              />
            </section>

            <section className='side-menu__links__section'>
              <div className="side-menu__links__section__header">
                <label htmlFor="temperature" className='side-menu__links__heading'>Temperature</label>
                <input id="temperatureSwitch" type="checkbox" className="g-switch"/>
                <label htmlFor="temperatureSwitch" className="g-switch__button"/>
              </div>
              <div className="side-menu__links__range-wrapper">
                <input
                  type='range'
                  id="temperature"
                  className='side-menu__links__range'
                  value={temperature}
                  min='-30'
                  max='130'
                  disabled={true}
                  onChange={(e) => setTemperature(Number(e.currentTarget.value))}
                />
                <input
                  type="number"
                  min="-30"
                  max="130"
                  readOnly
                  disabled={true}
                  className="side-menu__links__range__value" value={temperature}/>
              </div>
            </section>

            <section className='side-menu__links__section'>
              <div className="side-menu__links__section__header">
                <label htmlFor="ph" className='side-menu__links__heading'>pH</label>
                <input id="phSwitch" type="checkbox" className="g-switch"/>
                <label htmlFor="phSwitch" className="g-switch__button"/>
              </div>
              <div className="side-menu__links__range-wrapper">
                <input
                  type='range'
                  id="ph"
                  className='side-menu__links__range'
                  value={ph}
                  min='0'
                  max='15'
                  disabled={true}
                  onChange={(e) => setPh(Number(e.currentTarget.value))}
                />
                <input
                  type="number"
                  min="0"
                  max="15"
                  readOnly
                  value={ph}
                  disabled={true}
                  className="side-menu__links__range__value"/>
              </div>
            </section>

            <button type='submit' className='side-menu__submit' onClick={() => searchProject()}>SUBMIT</button>
          </nav>
        </nav>
        <div tabIndex={0}></div>
      </div>
    </div>
  )
}
export default SideMenu
