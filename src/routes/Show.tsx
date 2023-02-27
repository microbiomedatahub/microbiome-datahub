import '../css/show.css'

function Show() {
  return (
      <main className="app-main">
          <h2 className="page-title">Mississippi River Targeted Locus (Loci)</h2>
          <p className="facility-name">University of Minnesota</p>
          <div className="data-id">
              <dl className="data-id__data">
                  <div className="data-id__data__item">
                      <dt className="heading">organism</dt>
                      <dd className="content">fishwater metagenome</dd>
                  </div>

                  <div className="data-id__data__item">
                      <dt className="heading">data type</dt>
                      <dd className="content">targeted loci</dd>
                  </div>
              </dl>

              <p className="data-id__id">PRJNA189273</p>
          </div>

          <dl className="data-list">
              <div className="data-list__item">
                  <dt className="heading">Description</dt>
                  <dd className="content">
                      Raw sequence reads of the V6 hypervariable region of 16S rDNA from microbial communities within the Mississippi River.
                  </dd>
              </div>

              <div className="data-list__item">
                  <dt className="heading">Publication</dt>
                  <dd className="content">
                      <p className="id">PRJNA189273</p>
                      <p>Bacterial community structure is indicative of chemical inputs in the Upper Mississippi River.</p>
                  </dd>
              </div>

              <div className="data-list__item">
                  <dt className="heading">Properties</dt>
                  <dd className="content">
                      <p className="null">NULL</p>
                  </dd>
              </div>
          </dl>

          <dl className="date">
              <div className="date__item">
                  <dt className="heading">dateModified:</dt>
                  <dd className="content">2013-02-12</dd>
              </div>
              <div className="date__item">
                  <dt className="heading">dateCreated:</dt>
                  <dd className="content">2013-02-12</dd>
              </div>
          </dl>
      </main>
  )
}

export default Show
