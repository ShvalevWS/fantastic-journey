import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {AppHeaderComponent} from "./AppHeaderComponent";
import BreadcrumbComponent from "./BreadcrumbComponent";

const ProtectedRoute = ({children}: { children?: JSX.Element }) => {
  let location = useLocation();

  const loading = false;
  const isAuthenticated = true;

  if (loading) {
    return <p>Checking authentication..</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  return children ? children :
    <>
      <AppHeaderComponent/>
      <BreadcrumbComponent/>

      <Outlet></Outlet>
    </>
    ;
};

export default ProtectedRoute
