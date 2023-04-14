import { atom } from 'jotai'

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
