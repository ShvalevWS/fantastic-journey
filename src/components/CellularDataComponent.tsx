import {Selector, Switch} from "antd-mobile";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {SelectorOption} from "antd-mobile/es/components/selector/selector";
import {SimCard} from "../model/SimCard";
import {setCellularData} from "../store/cellularSlice";

export function CellularDataComponent() {

  const dispatch = useAppDispatch();
  const cellularData = useAppSelector((state) => state.cellularState.cellular);
  const simCards = useAppSelector((state) => state.cellularState.simCards);
  const options = [{label: 'Off', value: ''} as SelectorOption<string>];
  options.push(...simCards?.filter(x => x.enabled).map(x => {
    return {
      label: <span className={'sim__container'}><span>{x.operator}</span><span
        className={'phone'}>{x.phone}</span></span>, value: x.phone
    } as SelectorOption<string>
  }) ?? [])

  return (
    <div className={'settings settings__cellular'}>
      <Selector className={'selector selector__current-sim'}
                showCheckMark={false}
                options={options}
                multiple={false}
                onChange={(arr, extend) => console.log(arr, extend.items)}
      />

      <div className={'switch'}>
        Switching Cellular Data
        <Switch
          checked={cellularData.enableSwitch}
          onChange={(checked) => {
            dispatch(setCellularData({...cellularData, ...{enableSwitch: checked}}))
          }}></Switch>
      </div>
    </div>
  )
}
