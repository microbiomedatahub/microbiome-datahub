import { Dispatch, SetStateAction, useMemo } from 'react'

const SearchSelect = ({ heading, value, setValue, isEnabled, setIsEnabled, selectItems }: {
  heading: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  isEnabled: boolean
  setIsEnabled: Dispatch<SetStateAction<boolean>>
  selectItems: string[]
}) => {
  const switchId = useMemo(() => 'text_form_switch_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])
  const selectId = useMemo(() => 'select_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])
  const radioButtonId = (heading: string, item: string): string => {
    return 'search_select_radio_' + heading.replace(/\s+/g, '').toLowerCase() + '_' + item
  }

  return (
    <section className='side-menu__links__section'>
      <div className='side-menu__links__section__header'>
        <label htmlFor={selectId} className='side-menu__links__heading'>{heading}</label>
        <input
          id={switchId}
          type='checkbox'
          className='g-switch'
          onChange={() => setIsEnabled(!isEnabled)}
          checked={isEnabled}
        />
        <label htmlFor={switchId} className='g-switch__button' />
      </div>
      {selectItems.map((item, i) => {
        return (
          <>
            <input
              type='radio'
              className={'side-menu__links__item' + (item === value ? ' current' : '')}
              name={selectId}
              id={radioButtonId(heading, item)}
              value={item}
              key={i}
              disabled={!isEnabled}
              checked={item === value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <label htmlFor={radioButtonId(heading, item)}>{item}</label>
          </>
        )
      })}
    </section>
  )
}

export default SearchSelect
