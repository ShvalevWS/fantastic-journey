import {MobileConnectionStatusComponent} from "./MobileConnectionStatusComponent";
import {NtripStatusComponent} from "./NtripStatusComponent";
import {HomeCardButton} from "./HomeCardButton";

import connectNtrip from '../images/connect.svg';
import ntripSettings from '../images/ntripSettings.svg';
import mobileSettings from '../images/mobileSettings.svg';
import users from '../images/users.svg';
import settings from '../images/settings.svg';
import support from '../images/support.svg';
import {useNavigate} from "react-router-dom";
import { callbackify } from "util";


export function HomeComponent() {

  const navigate = useNavigate();

  const corr_request = () =>
  {
    fetch('127.0.0.1:5000/corr_request')
  }

  return (
    <div>
      <div className={'list list__statuses'}>
        <div className={'row'}>
          <MobileConnectionStatusComponent/>
          <NtripStatusComponent/>
        </div>
      </div>
      <div className={'list list__buttons'}>
        <div className={'row'}>
          <HomeCardButton
            title={'Connect to ntrip'}
            imagePath={connectNtrip}
            clickAction={() => corr_request()}
          />
          <HomeCardButton
            title={'Ntrip settings'}
            imagePath={ntripSettings}
            clickAction={() => navigate('/ntrip_settings')}
          />
        </div>
        <div className={'row'}>
          <HomeCardButton
            title={'Mobile settings'}
            imagePath={mobileSettings}
            clickAction={() => navigate('/mobile_settings')}
          />
          <HomeCardButton
            title={'List of users'}
            imagePath={users}
            clickAction={() => navigate('/users')}
          />
        </div>
        <div className={'row'}>
          <HomeCardButton
            title={'Settings'}
            imagePath={settings}
            clickAction={() => navigate('/peer_settings')}
          />
          <HomeCardButton
            title={'Support'}
            imagePath={support}
          />
        </div>
      </div>
    </div>
  )
}
