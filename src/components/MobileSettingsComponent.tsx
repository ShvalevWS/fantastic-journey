import {List} from "antd-mobile";
import {SimCard} from "../model/SimCard";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setCurrentSim} from "../store/cellularSlice";

export function MobileSettingsComponent() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cellularData = useAppSelector((state) => state.cellularState.cellular);
  const simCards = useAppSelector((state) => state.cellularState.simCards);

  return (
    <div className={'settings'}>
      <List className={'list list__cellular'}>
        {cellularData.currentSimCard
          && <List.Item description={cellularData.currentSimCard?.phone}
                        onClick={() => navigate('/mobile_settings/cellular')}>
                Cellular data</List.Item>
        }
      </List>
      <h6>All SIM cards</h6>
      <List className={'list list__sim-cards'}>
        {simCards?.map((s: SimCard) =>
          <List.Item description={s.enabled ? 'On' : 'Off'} onClick={() => dispatch(setCurrentSim(s)) && navigate('sim')}>
            <div>
              <div>{s.operator}</div>
              <div className={'phone'}>{s.phone}</div>
            </div>
          </List.Item>
        )}
      </List>
    </div>
  )
}
