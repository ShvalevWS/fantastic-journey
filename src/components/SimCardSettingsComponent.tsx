import {useAppDispatch, useAppSelector} from "../store/hooks";
import {editedSimCard, setSimSettings} from "../store/cellularSlice";
import {List, Picker} from "antd-mobile";
import {useState} from "react";
import {MobileNetworkType} from "../model/SimCard";
import {PickerValue} from "antd-mobile/es/components/picker-view";
import {Navigate, useNavigate} from "react-router-dom";

export function SimCardSettingsComponent() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sim = useAppSelector((state) => editedSimCard(state));
  const [typeNetworkVisible, setTypeNetworkVisible] = useState(false);

  if (sim === null) {
    return <Navigate to={'/mobile_settings'}/>
  }

  const columns = [['2G', '3G', '4G', '5G'] as MobileNetworkType[]];
  return (
    <List className={'list list__sim-card'}>
      <List.Item description={sim!.operator}>
        Mobile operator
      </List.Item>
      <List.Item description={sim!.phone}>
        Phone number
      </List.Item>
      <List.Item description={sim!.type} onClick={() => setTypeNetworkVisible(true)}>
        Data transfer
        <Picker
          confirmText={'OK'}
          cancelText={'Cancel'}
          value={[sim!.type] as PickerValue[]}
          popupClassName={'max-width-popup'}
          columns={columns}
          visible={typeNetworkVisible}
          onClose={() => {
            setTypeNetworkVisible(false)
          }}
          onConfirm={(val: PickerValue[]) => {
            dispatch(setSimSettings({...sim!, ...{type: val[0] as MobileNetworkType}}));
          }}
        ></Picker>
      </List.Item>
      <List.Item onClick={() => navigate('apn')}>
        APN settings
      </List.Item>

    </List>
  )
}
