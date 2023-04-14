const GenomeCategory = (
  {
    genomeTaxon, 
    setGenomeTaxon, 
    genomeCategory,
    setGenomeCategory,
    magSource,
    setMagSource,
    magCompleteness, 
    setMagCompleteness,
  }: {
    genomeTaxon: string, 
    setGenomeTaxon: React.Dispatch<React.SetStateAction<string>>,
    genomeCategory: string,
    setGenomeCategory: React.Dispatch<React.SetStateAction<string>>,
    magSource: string,
    setMagSource: React.Dispatch<React.SetStateAction<string>>,
    magCompleteness: number,
    setMagCompleteness: React.Dispatch<React.SetStateAction<number>>
  }
) => {
  const handleGenomeCategory = (category: string) => {
    setGenomeCategory(genomeCategory === category ? '' : category)
  }
  const handleMagSource = (source: string) => {
    setMagSource(magSource === source ? '' : source)
  }

  return (
    <>
      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>Genome taxon</label>
        <input
          type='text'
          placeholder='Genome taxon'
          className='side-menu__links__input'
          value={genomeTaxon}
          onChange={(e) => setGenomeTaxon(e.currentTarget.value)}
        />
      </section>

      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>Genome Category</label>
        {['Isolate complete', 'Isolate draft', 'MAG high quality', 'MAG low quality'].map((item, index) => {
          return <p 
            key={index} 
            className={`side-menu__links__item${item === genomeCategory ? ' current' : ''}`}
            onClick={() => handleGenomeCategory(item)}
          >
            {item}
          </p>
        })}
      </section>

      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>MAG source</label>
        {['INSDC', 'MGnify', 'Other DBs', 'Original'].map((item, index) => {
          return <p
            key={index}
            className={`side-menu__links__item${item === magSource ? ' current' : ''}`}
            onClick={() => handleMagSource(item)}
          >
            {item}
          </p>
        })}
      </section>

      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>MAG completeness</label>
        <input
          type='range'
          className='side-menu__links__range'
          value={magCompleteness}
          min='40'
          max='100'
          onChange={(e) => setMagCompleteness(e.currentTarget.valueAsNumber)}
        />
      </section>
    </>
  )
}

export default GenomeCategory
