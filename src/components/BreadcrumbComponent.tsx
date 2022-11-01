import useBreadcrumbs from 'use-react-router-breadcrumbs';
import back from '../images/back.svg';
import {useNavigate} from "react-router-dom";

export  default function BreadcrumbComponent() {

  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();

  console.log(breadcrumbs)

  if (breadcrumbs.length > 1) {

    const prevRoute = breadcrumbs.slice(-2, -1).pop();
    const currentRoute = breadcrumbs.slice(-1).pop();

    return (
      <div className={'breadcrumb'}>
        <span className={'back'} onClick={() => navigate(prevRoute!.key)}> <img alt={''} src={back}/></span> <span>{currentRoute!.breadcrumb}</span>
      </div>
    );
  }

  return <></>;
}
