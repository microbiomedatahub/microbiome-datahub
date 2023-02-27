import '../css/index.css'
import {Link} from "react-router-dom"

function Index() {
  return (
      <main className="app-main">
          <h2 className="page-title">PROJECT</h2>
          <section className="tags">
              <button className="tags__item">host taxon name</button>
              <button className="tags__item">host taxon name</button>
              <button className="tags__item">T: -99 ― 45</button>
          </section>

          <form action="" className="search">
              <p className="search__results-number">
                  9999 / 9999
              </p>
              <input type="search" className="search__input" placeholder="Search Keyword"/>
              <label htmlFor="sort" className="search__sort-label">order by</label>
              <select name="sortType" id="sort" className="search__sort-select">
                  <option value="Project ID">Project ID</option>
              </select>
              <div className="search__order">
                  <button value="" className="search__order__button active">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8">
                          <path d="M10.59 7.42L6 2.83L1.41 7.42L0 6L6 -1.90735e-06L12 6L10.59 7.42Z" fill="#D9D9D9"/>
                      </svg>
                  </button>
                  <button value="" className="search__order__button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8">
                          <path d="M1.41 0.580002L6 5.17L10.59 0.580002L12 2L6 8L0 2L1.41 0.580002Z" fill="#D9D9D9"/>
                      </svg>
                  </button>
              </div>
          </form>

          <section className="results">
              <article className="results__item">
                  <div className="results__item__header">
                      <h2 className="title">
                          <Link to={`/show/`} title="">
                              Reference human gut microbiome project
                          </Link>
                      </h2>
                      <p className="id">PRJNA826698</p>
                  </div>
                  <dl className="results__item__data">
                      <div className="results__item__data__item">
                          <dt className="heading">Environment</dt>
                          <dd className="content">
                              <button className="content__button">gut</button>
                          </dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">Host taxon</dt>
                          <dd className="content">
                              <button className="content__button">Homo sapiens</button>
                          </dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">BioSamples</dt>
                          <dd className="content">120</dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">Data size (GB)</dt>
                          <dd className="content">800</dd>
                      </div>
                  </dl>
              </article>

              <article className="results__item">
                  <div className="results__item__header">
                      <h2 className="title">Reference human gut microbiome project</h2>
                      <p className="id">PRJNA826698</p>
                  </div>
                  <dl className="results__item__data">
                      <div className="results__item__data__item">
                          <dt className="heading">Environment</dt>
                          <dd className="content">
                              <button className="content__button">gut</button>
                          </dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">Host taxon</dt>
                          <dd className="content">
                              <button className="content__button">Homo sapiens</button>
                          </dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">BioSamples</dt>
                          <dd className="content">120</dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">Data size (GB)</dt>
                          <dd className="content">800</dd>
                      </div>
                  </dl>
              </article>

              <article className="results__item">
                  <div className="results__item__header">
                      <h2 className="title">Reference human gut microbiome project</h2>
                      <p className="id">PRJNA826698</p>
                  </div>
                  <dl className="results__item__data">
                      <div className="results__item__data__item">
                          <dt className="heading">Environment</dt>
                          <dd className="content">
                              <button className="content__button">gut</button>
                          </dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">Host taxon</dt>
                          <dd className="content">
                              <button className="content__button">Homo sapiens</button>
                          </dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">BioSamples</dt>
                          <dd className="content">120</dd>
                      </div>

                      <div className="results__item__data__item">
                          <dt className="heading">Data size (GB)</dt>
                          <dd className="content">800</dd>
                      </div>
                  </dl>
              </article>

              <nav className="pagination" aria-label="ページャー">
                  <span className="pagination__item current">1</span>
                  <a href="" className="pagination__item">2</a>
                  <a href="" className="pagination__item">3</a>
                  <div className="pagination__item dot">
                      <svg viewBox="0 0 31 4" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="2" cy="2" r="2" fill="#D9D9D9"/>
                          <circle cx="11" cy="2" r="2" fill="#D9D9D9"/>
                          <circle cx="20" cy="2" r="2" fill="#D9D9D9"/>
                          <circle cx="29" cy="2" r="2" fill="#D9D9D9"/>
                      </svg>
                  </div>
                  <a href="" className="pagination__item">999</a>
              </nav>
          </section>
      </main>
  )
}

export default Index
