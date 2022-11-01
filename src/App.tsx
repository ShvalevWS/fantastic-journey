import React from 'react';

import './start.css';
import './app.scss';
import {IntlProvider} from "react-intl";

import {LOCALES} from './i18n/locales';
import {messages} from './i18n/messages';

import {BrowserRouter, Routes} from "react-router-dom";
import { Route } from 'use-react-router-breadcrumbs';
import {HomeComponent} from "./components/HomeComponent";
import {LoginPage} from "./pages/LoginPage";
import {NoMatchPage} from "./pages/NoMatchPage";
import ProtectedRoute from "./components/ProtectedRoute";
import {NtripSettingsComponent} from "./components/NtripSettingsComponent";
import {ListUserComponent} from "./components/ListUserComponent";
import {MobileSettingsComponent} from "./components/MobileSettingsComponent";
import {PeerSettingsComponent} from "./components/PeerSettingsComponent";
import {Provider} from "react-redux";
import {store} from './store/store'
import {CellularDataComponent} from "./components/CellularDataComponent";
import {SimCardSettingsComponent} from "./components/SimCardSettingsComponent";
import {ApnComponent} from "./components/ApnComponent";

function App() {
  const locale = LOCALES.ENGLISH

  return (
    <IntlProvider messages={messages[locale]}
                  locale={locale}
                  defaultLocale={locale}>
      <Provider store={store}>
        <div className={'app-container'}>
          <div className="app">
            <BrowserRouter>
              <Routes>
                <Route path="login" element={<LoginPage/>}/>
                <Route path={'/'} element={<ProtectedRoute/>}>
                  <Route path={'/'} element={<HomeComponent/>}></Route>
                  <Route path={'/ntrip_settings'} breadcrumb={'NTRIP settings'} element={<NtripSettingsComponent/>}></Route>
                  <Route path={'/peer_settings'} breadcrumb={'Peer settings'} element={<PeerSettingsComponent/>}></Route>
                  <Route path={'/users'} element={<ListUserComponent/>}></Route>
                  <Route path={'/mobile_settings'} element={<MobileSettingsComponent/>}></Route>
                  <Route path={'/mobile_settings/cellular'} breadcrumb={'Cellular data'} element={<CellularDataComponent/>}></Route>
                  <Route path={'/mobile_settings/sim'} breadcrumb={'Sim'} element={<SimCardSettingsComponent/>}></Route>
                  <Route path={'/mobile_settings/sim/apn'} breadcrumb={'APN'} element={<ApnComponent/>}></Route>
                </Route>

                <Route path="*" element={<NoMatchPage/>}/>
              </Routes>
            </BrowserRouter>

          </div>
        </div>
      </Provider>
    </IntlProvider>
  );
}

export default App;
