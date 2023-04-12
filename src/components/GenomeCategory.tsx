const GenomeCategory = () => {
  return (
    <>
      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>Genome taxon</label>
        <input
          type='text'
          placeholder='Genome taxon'
          className='side-menu__links__input'
        />
      </section>

      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>Genome Category</label>
        {['Isolate complete', 'Isolate draft', 'MAG high quality', 'MAG low quality'].map((item, index) => {
          return <p key={index} className={'side-menu__links__item'}>{item}</p>
        })}
      </section>

      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>MAG source</label>
        {['INSDC', 'MGnify', 'Other DBs', 'Original'].map((item, index) => {
          return <p key={index} className='side-menu__links__item'>{item}</p>
        })}
      </section>

      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>MAG completeness</label>
        <input
          type='range'
          className='side-menu__links__range'
          value='50'
          min='40'
          max='100'
        />
      </section>
    </>
  )
}

export default GenomeCategory
