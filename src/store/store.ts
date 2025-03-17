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

export const linkStringBaseGenomeAtom = atom<string>(
  '/genomes?quality=0,1,2,3,4,5&dataSource=INSDC,RefSeq&sort=dateCreated-',
)

export const linkStringBaseProjectAtom = atom<string>(
  '/projects?sort=dateCreated-',
)

export const selectedGenomeIdsAtom = atom<string[]>([])
export const selectedProjectIdsAtom = atom<string[]>([])
