import { Dispatch, SetStateAction } from 'react'

const SearchMenuKeyword = (
  { keyword, setKeyword }: {
    keyword: string
    setKeyword: Dispatch<SetStateAction<string>>
  },
) => {
  return (
    <div className='side-menu__keyword'>
      <input
        type='search'
        className='side-menu__keyword__input'
        placeholder='Search Keyword'
        onChange={(e) => setKeyword(e.currentTarget.value)}
        value={keyword}
      />
    </div>
  )
}

export default SearchMenuKeyword
