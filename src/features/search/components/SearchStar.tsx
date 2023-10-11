import { Dispatch, SetStateAction } from 'react'

const switchId = 'star_form_switch'

const qualityStars = [
  ['star5', 'quality_5star', '★★★★★ (5)'],
  ['star4', 'quality_4star', '★★★★✩ (4)'],
  ['star3', 'quality_3star', '★★★✩✩ (3)'],
  ['star2', 'quality_2star', '★★✩✩✩ (2)'],
  ['star1', 'quality_1star', '★✩✩✩✩ (1)'],
  ['notReviewed', 'quality_notReviewed', 'not reviewed'],
]

const SearchStar = (
  { value, setValue, isEnabled, setIsEnabled }: {
    value: number[]
    setValue: Dispatch<SetStateAction<number[]>>
    isEnabled: boolean
    setIsEnabled: Dispatch<SetStateAction<boolean>>
  },
) => {
  return (
    <div className='side-menu__links__section'>
      <div className='side-menu__links__section__header'>
        <label htmlFor='star_form' className='side-menu__links__heading'>Quality</label>
        <input
          id={switchId}
          type='checkbox'
          className='g-switch'
          onChange={() => setIsEnabled(!isEnabled)}
          checked={isEnabled}
        />
        <label htmlFor={switchId} className='g-switch__button' />
      </div>
      <div className='side-menu__radio-wrapper'>
        {qualityStars.map((qs) => {
          return (
            <>
              <input id={qs[0]} name={qs[1]} type='checkbox' className='radio--square' />
              <label htmlFor={qs[0]} className='label'>{qs[2]}</label>
            </>
          )
        })}
      </div>
    </div>
  )
}
export default SearchStar
