import { Dispatch, SetStateAction } from 'react'

interface QualityStar {
  id: string
  name: string
  displayValue: string
  value: number
}

const qualityStars: QualityStar[] = [
  { id: 'star5', name: 'quality_5star', displayValue: '★★★★★ (5)', value: 5 },
  { id: 'star4', name: 'quality_4star', displayValue: '★★★★✩ (4)', value: 4 },
  { id: 'star3', name: 'quality_3star', displayValue: '★★★✩✩ (3)', value: 3 },
  { id: 'star2', name: 'quality_2star', displayValue: '★★✩✩✩ (2)', value: 2 },
  { id: 'star1', name: 'quality_1star', displayValue: '★✩✩✩✩ (1)', value: 1 },
  { id: 'notReviewed', name: 'quality_notReviewed', displayValue: 'not reviewed', value: 0 },
]

const SearchStar = (
  { value, setValue }: {
    value: number[]
    setValue: Dispatch<SetStateAction<number[]>>
  },
) => {
  return (
    <div className='side-menu__links__section'>
      <div className='side-menu__links__section__header'>
        <label htmlFor='star_form' className='side-menu__links__heading'>Quality</label>
      </div>
      <div className='side-menu__radio-wrapper'>
        {qualityStars.map((qs, i) => {
          return (
            <div key={'star_form_selectbox_' + i}>
              <input
                id={qs.id}
                name={qs.name}
                type='checkbox'
                className='radio--square'
                checked={value.some((el) => el === qs.value)}
                onChange={() => {
                  if (value.some((el) => el === qs.value)) {
                    const deletedValues = value.filter((el) => el !== qs.value)
                    setValue(deletedValues)
                    return
                  }
                  setValue([...value, qs.value])
                }}
              />
              <label htmlFor={qs.id} className='label'>{qs.displayValue}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default SearchStar
