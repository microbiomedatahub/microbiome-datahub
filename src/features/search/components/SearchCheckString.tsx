import {Dispatch, SetStateAction} from 'react'

const SearchCheckString= (
  { heading, value, setValue, checkItems }: {
    heading: string
    value: string[]
    setValue: Dispatch<SetStateAction<string[]>>
    checkItems: CheckItemString[]
  },
) => {
  const checkItemName = (item: string): string => {
    return 'search_check_' + heading.replace(/\s+/g, '').toLowerCase() + '_' + item
  }
  const checkItemId = (item: string): string => {
    return 'search_check_' + heading.replace(/\s+/g, '').toLowerCase() + '_' + item
  }
  return (
    <div className='side-menu__links__section'>
      <div className='side-menu__links__section__header'>
        <label htmlFor='star_form' className='side-menu__links__heading'>{heading}</label>
      </div>
      <div className='side-menu__radio-wrapper'>
        {checkItems.map((qs, i) => {
          return (
            <div key={'dataSource_form_switch_' + i}>
              <input
                id={checkItemId(qs.id)}
                name={checkItemName(qs.name)}
                type='checkbox'
                className='radio--square'
                checked={value.some((el:string) => el === qs.value)}
                onChange={() => {
                  if (value.some((el:string) => el === qs.value)) {
                    const deletedValues = value.filter((el) => el !== qs.value)
                    setValue(deletedValues)
                    return
                  }
                  setValue([...value, qs.value])
                }}
              />
              <label htmlFor={checkItemId(qs.id)} className='label'>{qs.displayValue}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default SearchCheckString
