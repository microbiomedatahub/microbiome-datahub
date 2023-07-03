import { Dispatch, SetStateAction, useMemo } from 'react'

const SearchText = ({ heading, value, setValue, isEnabled, setIsEnabled }: {
  heading: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  isEnabled: boolean
  setIsEnabled: Dispatch<SetStateAction<boolean>>
}) => {
  const switchId = useMemo(() => 'text_form_switch_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])
  const textFormId = useMemo(() => 'text_form_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])

  return (
    <section className='side-menu__links__section'>
      <div className='side-menu__links__section__header'>
        <label htmlFor={textFormId} className='side-menu__links__heading'>{heading}</label>
        <input
          id={switchId}
          type='checkbox'
          className='g-switch'
          onChange={() => setIsEnabled(!isEnabled)}
          checked={isEnabled}
        />
        <label htmlFor={switchId} className='g-switch__button' />
      </div>
      <input
        type='text'
        id='hostLocation'
        className='side-menu__links__input'
        value={value}
        disabled={!isEnabled}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </section>
  )
}

export default SearchText
