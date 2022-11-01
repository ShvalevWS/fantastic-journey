import logo from "../images/logo.svg";
import {useIntl} from "react-intl";

export function LogoComponent() {

  const intl = useIntl();
  const title = intl.formatMessage({id: 'vi_base_title'});

  return (
    <div className={'logo__container'}>
      <img src={logo} alt={title} className={'logo__image'}/>
      <h1 className={'logo__title'}>{title}</h1>
    </div>
  )
}
