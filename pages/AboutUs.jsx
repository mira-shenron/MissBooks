const { Outlet, Link, NavLink } = ReactRouterDOM;


export function AboutUs() {
  return (
    <div className="about">
      <nav className="about-nav">
        <NavLink to="/about/team">Team</NavLink>
        <NavLink to="/about/vision">Vision</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
