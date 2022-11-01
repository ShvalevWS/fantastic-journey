import CurrentUserComponent from "./CurrentUserComponent";
import {LogoComponent} from "./LogoComponent";

export function AppHeaderComponent() {
  return (
    <header className={'header'}>
      <LogoComponent/>
      <CurrentUserComponent/>
    </header>
  );
}
