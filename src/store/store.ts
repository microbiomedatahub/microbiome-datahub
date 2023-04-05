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

export const selectModeAtom = atom(
  'project',
)

export const totalAtom = atom(
  0,
)
