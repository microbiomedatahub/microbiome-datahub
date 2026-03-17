import Slider from '@mui/material/Slider'
import { Dispatch, SetStateAction, useMemo } from 'react'

const SearchRangeMinMax = (
  { heading, minValue, setMinValue, maxValue, setMaxValue, isEnabled, setIsEnabled, min, max }: {
    heading: string
    minValue: number
    setMinValue: Dispatch<SetStateAction<number>>
    maxValue: number
    setMaxValue: Dispatch<SetStateAction<number>>
    isEnabled: boolean
    setIsEnabled: Dispatch<SetStateAction<boolean>>
    min: number
    max: number
  },
) => {
  const switchId = useMemo(() => 'switch_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setMinValue(newValue[0])
      setMaxValue(newValue[1])
    }
  }

  return (
    <section className='side-menu__links__section'>
      <div className='side-menu__links__section__header'>
        <label className='side-menu__links__heading'>{heading}</label>
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
          type='number'
          readOnly
          value={minValue}
          disabled={!isEnabled}
          className='side-menu__links__range__value'
        />
        <Slider
          value={[minValue, maxValue]}
          onChange={handleChange}
          min={min}
          max={max}
          disabled={!isEnabled}
          disableSwap
          sx={{
            color: '#D9E016',
            '& .MuiSlider-rail': { backgroundColor: '#C5C5C5' },
            '& .MuiSlider-track': { backgroundColor: '#D9E016', borderColor: '#D9E016' },
            '& .MuiSlider-thumb': {
              width: 11,
              height: 11,
              border: '2px solid #FFF',
              backgroundColor: '#D9E016',
              '&.Mui-disabled': { backgroundColor: '#D9D9D9', borderColor: '#C5C5C5' },
            },
            '&.Mui-disabled': { color: '#C5C5C5' },
            '&.Mui-disabled .MuiSlider-track': { backgroundColor: '#C5C5C5', borderColor: '#C5C5C5' },
            mx: '8px',
          }}
        />
        <input
          type='number'
          readOnly
          value={maxValue}
          disabled={!isEnabled}
          className='side-menu__links__range__value'
        />
      </div>
    </section>
  )
}

export default SearchRangeMinMax