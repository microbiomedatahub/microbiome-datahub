const GenomeCategory = () => {
  return (
    <>
      <section className='side-menu__links__section'>
        <label className='side-menu__links__heading'>Genome Category</label>
        {['Isolate complete', 'Isolate draft', 'MAG high quality', 'MAG low quality'].map((item, index) => {
          return <p key={index} className={'side-menu__links__item'}>{item}</p>
        })}
      </section>
    </>
  )
}

export default GenomeCategory
