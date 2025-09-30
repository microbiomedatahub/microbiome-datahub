import { Autocomplete } from '@mui/material'
import { Dispatch, SetStateAction, useMemo } from 'react'

const SearchSelectAutocomplete = ({
  heading,
  value,
  setValue,
  isEnabled,
  setIsEnabled,
  selectItems,
  options,
}: {
  heading: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  isEnabled: boolean
  setIsEnabled: Dispatch<SetStateAction<boolean>>
  selectItems: string[]
  options: string[]
}) => {
  const switchId = useMemo(() => 'text_form_switch_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])
  const selectId = useMemo(() => 'select_' + heading.replace(/\s+/g, '').toLowerCase(), [heading])
  const radioButtonId = (heading: string, item: string): string => {
    return 'search_select_radio_' + heading.replace(/\s+/g, '').toLowerCase() + '_' + item
  }

  return (
    <div className='side-menu__links__section'>
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
          <div key={i}>
            <input
              type='radio'
              className={'side-menu__links__item' + (item === value ? ' current' : '')}
              name={selectId}
              id={radioButtonId(heading, item)}
              value={item}
              disabled={!isEnabled}
              checked={item === value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <label htmlFor={radioButtonId(heading, item)}>{item}</label>
          </div>
        )
      })}

      <div className="side-menu__autocomplete">
        <Autocomplete
          freeSolo
          disabled={!isEnabled}
          options={options}
          inputValue={value}
          onInputChange={(_, value) => setValue(value)}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                disabled={!isEnabled}
                className='side-menu__links__input'
              />
            </div>
          )}
          slotProps={{
            paper: {
              sx: {
                '& .MuiAutocomplete-listbox': {
                  fontSize: '1.6rem',
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default SearchSelectAutocomplete
