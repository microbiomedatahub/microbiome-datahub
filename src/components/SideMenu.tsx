import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectSearchQueryAtom, selectModeAtom } from '../store/store'

const SideMenu = () => {
  const [isShow, setIsShow] = useState(false)
  const handleToggleButtonClick = () => {
    setIsShow(!isShow)
  }
  const setProjectSearchQuery = useSetAtom(projectSearchQueryAtom)

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
  const [hostTaxon, setHostTaxon] = useState('')
  const [hostDisease, setHostDisease] = useState('')
  const [hostLocation, setHostLocation] = useState('')
  const [temperature, setTemperature] = useState(50)
  const [ph, setPh] = useState(0)

  const searchProject = () => {
    setProjectSearchQuery({
      sample_organism: selectedEnv,
      sample_host_organism: hostTaxon,
      sample_host_disease: hostDisease,
      sample_host_location: hostLocation,
      sample_temperature_range: temperature,
    })
  }

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
          <nav className='side-menu__select-panel'>
            {['project', 'genome'].map((item, index) => {
              return (
                <Link
                  key={index}
                  className={`side-menu__select-panel__button${selectMode === item ? ' current' : ''}`}
                  to={`${item}s`}
                >
                  {item.toUpperCase()}
                </Link>
              )
            })}
          </nav>
          <nav id='projectMenu' className='side-menu__links'>
            <section className='side-menu__links__section'>
              <h2 className='side-menu__links__heading'>Environment</h2>
              {environments.map((item, index) => {
                return (
                  <p
                    key={index}
                    title={item}
                    className={`side-menu__links__item ${item === selectedEnv ? ' current' : ''}`}
                    onClick={() => setSelectedEnv(item)}
                  >
                    {item}
                  </p>
                )
              })}
            </section>

            <section className='side-menu__links__section'>
              <label className='side-menu__links__heading'>Host taxon</label>
              <input
                type='text'
                placeholder='Host taxon name'
                className='side-menu__links__input'
                value={hostTaxon}
                onChange={(e) => setHostTaxon(e.currentTarget.value)}
              />
            </section>

            <section className='side-menu__links__section'>
              <label className='side-menu__links__heading'>Host disease</label>
              <input
                type='text'
                className='side-menu__links__input'
                value={hostDisease}
                onChange={(e) => setHostDisease(e.currentTarget.value)}
              />
            </section>

            <section className='side-menu__links__section'>
              <label className='side-menu__links__heading'>Host location</label>
              <input
                type='text'
                className='side-menu__links__input'
                value={hostLocation}
                onChange={(e) => setHostLocation(e.currentTarget.value)}
              />
            </section>

            <section className='side-menu__links__section'>
              <label className='side-menu__links__heading'>Temperature</label>
              <input
                type='range'
                className='side-menu__links__range'
                value={temperature}
                min='-30'
                max='130'
                onChange={(e) => setTemperature(Number(e.currentTarget.value))}
              />
            </section>

            <section className='side-menu__links__section'>
              <label className='side-menu__links__heading'>pH</label>
              <input
                type='range'
                className='side-menu__links__range'
                value={ph}
                min='0'
                max='15'
                onChange={(e) => setPh(Number(e.currentTarget.value))}
              />
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
