const SearchStar = () => {
  return (
    <div className='side-menu__links__section'>
      <p className="side-menu__links__heading">Quality</p>
      <div className="side-menu__radio-wrapper">
        <input id="star5" name="quality" type="radio" className="radio--square"/>
        <label htmlFor="star5" className="label">★★★★★ (5)</label>

        <input id="star4" name="quality" type="radio" className="radio--square"/>
        <label htmlFor="star4" className="label">★★★★✩ (4)</label>

        <input id="star3" name="quality" type="radio" className="radio--square"/>
        <label htmlFor="star3" className="label">★★★✩✩ (3)</label>

        <input id="star2" name="quality" type="radio" className="radio--square"/>
        <label htmlFor="star2" className="label">★★✩✩✩ (2)</label>

        <input id="star1" name="quality" type="radio" className="radio--square"/>
        <label htmlFor="star1" className="label">★✩✩✩✩ (1)</label>

        <input id="notReview" name="quality" type="radio" className="radio--square"/>
        <label htmlFor="notReview" className="label">not review</label>
      </div>
    </div>
  )
}
export default SearchStar
