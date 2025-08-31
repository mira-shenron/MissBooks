const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section className="header-nav-items">
        <h1 className="logo"><Link to="/home">Miss Books</Link></h1>
        <nav className="app-nav">
          <NavLink to="/book">Books</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>
      </section>
    </header>
  );
}
