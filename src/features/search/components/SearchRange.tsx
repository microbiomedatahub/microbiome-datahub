import { Dispatch, SetStateAction, useMemo } from 'react'

const SearchRange = (
  { heading, value, setValue, isEnabled, setIsEnabled, min, max }: {
    heading: string
    value: number
    setValue: Dispatch<SetStateAction<number>>
    isEnabled: boolean
    setIsEnabled: Dispatch<SetStateAction<boolean>>
    min: number
    max: number
  },
) => {
  const switchId = useMemo(() => 'switch_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])
  const rangeId = useMemo(() => 'range_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])

  return (
    <section className='side-menu__links__section'>
      <div className='side-menu__links__section__header'>
        <label htmlFor={rangeId} className='side-menu__links__heading'>{heading}</label>
        <input
          id={switchId}
          type='checkbox'
          className='g-switch'
          onChange={() => setIsEnabled(!isEnabled)}
          checked={isEnabled}
        />
        <label htmlFor={switchId} className='g-switch__button' />
      </div>
      <div className='side-menu__links__range-wrapper'>
        <input
          type='range'
          id={rangeId}
          className='side-menu__links__range'
          value={value}
          min={min}
          max={max}
          disabled={!isEnabled}
          onChange={(e) => setValue(Number(e.currentTarget.value))}
        />
        <input
          type='number'
          min={min}
          max={max}
          readOnly
          value={value}
          disabled={!isEnabled}
          className='side-menu__links__range__value'
        />
      </div>
    </section>
  )
}

export default SearchRange
