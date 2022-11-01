import {Button, Popover, Toast} from 'antd-mobile';
import {LOCALES} from '../i18n/locales';
import {Action} from "antd-mobile/es/components/popover";
import {useState} from "react";
import {useIntl} from "react-intl";
import {DownOutline} from "antd-mobile-icons";

export function LangSelectorComponent() {

  const intl = useIntl();

  const actions: Action[] = [
    {key: 'LOCALES.ENGLISH', text: intl.formatMessage({id: LOCALES.ENGLISH})},
    {key: 'LOCALES.GERMAN', text: intl.formatMessage({id: LOCALES.GERMAN})},
  ]

  const [lang, setLang] = useState(intl.formatMessage({id: LOCALES.ENGLISH}));
  return (
    <div className={'lang-selector__container'}>
      <Popover.Menu
        actions={actions}
        placement='bottom-start'
        onAction={node => {
          Toast.show(`${node.text}`);
          setLang(node.text as string);
        }}
        trigger='click'
      >
        <Button>{lang} <DownOutline /></Button>
      </Popover.Menu>
    </div>
  );
}
