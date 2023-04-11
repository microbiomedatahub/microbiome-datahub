import { atom } from 'jotai'

export const projectSearchQueryAtom = atom(
  {
    sample_organism: '',
    sample_host_organism: '',
    sample_host_disease: '',
    sample_host_location: '',
    sample_temperature_range: 50,
  },
)

export const searchKeywordAtom = atom('')

export const selectModeAtom = atom(
  'project',
)

export interface ResultsCountTotalState {
  itemCount: number
  total: number
}

export const resultsCountTotalAtom = atom<ResultsCountTotalState>({
  itemCount: 0,
  total: 0,
})
