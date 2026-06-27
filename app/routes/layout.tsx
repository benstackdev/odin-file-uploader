import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="">
      <nav className={`flex justify-center gap-8 mb-4`}>
        <NavLink to={`/`}>Home</NavLink>
        <NavLink to={`/sign-up`}>Sign Up</NavLink>
        <NavLink to={`/sign-in`}>Sign In</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;