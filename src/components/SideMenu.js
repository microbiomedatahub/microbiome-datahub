
const SideMenu = () => {
    return (
        <nav className="side-menu" aria-label="サイドメニュー">
            <nav className="side-menu__select-panel">
                <button className="side-menu__select-panel__button current">PROJECT</button>
                <button className="side-menu__select-panel__button">GENOME</button>
            </nav>
            <nav id="projectMenu" className="side-menu__links">
                <section className="side-menu__links__section">
                    <h2 className="side-menu__links__heading">Environment</h2>
                    <a href="" title="soil" className="side-menu__links__item current">soil</a>
                    <a href="" title="marine" className="side-menu__links__item">marine</a>
                    <a href="" title="freshwater" className="side-menu__links__item">freshwater</a>
                    <a href="" title="hot spring" className="side-menu__links__item">hot spring</a>
                    <a href="" title="sediment" className="side-menu__links__item">sediment</a>
                    <a href="" title="air" className="side-menu__links__item">air</a>
                    <a href="" title="gut" className="side-menu__links__item">gut</a>
                    <a href="" title="oral" className="side-menu__links__item">oral</a>
                    <a href="" title="skin" className="side-menu__links__item">skin</a>
                    <a href="" title="reproductive system" className="side-menu__links__item">reproductive system</a>
                    <a href="" title="human activity related" className="side-menu__links__item">human activity related</a>
                </section>

                <section className="side-menu__links__section">
                    <label className="side-menu__links__heading">Host taxon</label>
                    <input type="text" placeholder="Host taxon name" className="side-menu__links__input"/>
                </section>

                <section className="side-menu__links__section">
                    <label className="side-menu__links__heading">Host disease</label>
                    <input type="text" className="side-menu__links__input"/>
                </section>

                <section className="side-menu__links__section">
                    <label className="side-menu__links__heading">Host location</label>
                    <input type="text" className="side-menu__links__input"/>
                </section>

                <section className="side-menu__links__section">
                    <label className="side-menu__links__heading">Temperature</label>
                    <input type="range" className="side-menu__links__range"/>
                </section>
            </nav>
        </nav>
    );
};
export default SideMenu;
