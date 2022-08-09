import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// layouts
import Auth from './layouts/Auth';
// pages
import Main from './pages/Main';
import Doc from './pages/Doc';
import Settings from './pages/Settings';
import SettingsIndex from './pages/settings/Index';
import SettingsGeneral from './pages/settings/General';
import SettingsSecurity from './pages/settings/Security';
import SettingsAdvanced from './pages/settings/Advanced';
import SettingsContacts from './pages/settings/Contacts';
import SettingsAddContact from './pages/settings/AddContact';
import SettingsNetworks from './pages/settings/Networks';
import SettingsAddNetwork from './pages/settings/AddNetwork';
import AddFunds from "./pages/AddFunds";
import AddFundsIndex from "./pages/add-funds/Index";
import AddFundsCreditDetail from "./pages/add-funds/CreditDetail";
import Receive from './pages/Receive';
import ReceiveIndex from './pages/receive/Index';
import ReceiveDetail from './pages/receive/Detail';
import ReceiveQR_Code from './pages/receive/QR_Code';
import Send from './pages/Send';
import SendIndex from './pages/send/Index';
import SendDetail from './pages/send/Detail';
import SendConfirm from './pages/send/Confirm';
import Swap from './pages/Swap';
import SwapIndex from './pages/swap/Index';
import SwapConfirm from './pages/swap/Confirm';
import Vote from './pages/Vote';
import VoteSuccess from './pages/VoteSuccess';
import Login from './pages/auth/Login';
import Verify from './pages/auth/Verify';
import AuthExtra from './pages/auth/Extra';
import AuthExtraIndex from './pages/auth/extra/Index';
import AuthExtraRegister1 from './pages/auth/extra/Register1';
import AuthExtraRegister2 from './pages/auth/extra/Register2';
import AuthExtraRegister3 from './pages/auth/extra/Register3';
import AuthExtraRegister4 from './pages/auth/extra/Register4';
import MainLayout from './layouts/MainLayout';
import TransactionHistory from "./pages/TransactionHistory";
import FillKYC from "./pages/FillKYC";
import React, { useContext } from 'react'

// Context
import AppContextProvider from './context/AppContextProvider';
import {GlobalContextProvider} from './context/GlobalContextProvider'


import styled from "styled-components";
import { appWidth, appHeight } from "./constants/dimentions";
const App = styled.div`
  width: ${appWidth}px;
  height: ${appHeight}px;
`;

function AppEX() {
  //global
  const [address, setAddress] = React.useState({name: 'Account 1', addr: '0x34F08f2671A1d940875b0F3614438F5AEA008af6', key: 'df4995554e45536a311c677b33701e29abccf53c4b29fdf564cc2861751e80f7'});
  const [network, setNetwork] = React.useState({name: 'Binance Smart Chain'});
  

  return (
    <App>
      <AppContextProvider>
        <GlobalContextProvider value={{
          address,
          setAddress,
          network, 
          setNetwork, 
          }}>
          <Router>
            <Routes >
              {/* <Route path="/" element={<div>Hello</div>}></Route> */}
              <Route path="" element={<Auth />}>
                <Route path="login" element={<Login />}></Route>
                <Route path="verify" element={<Verify />}></Route>
                <Route path="extra" element={<AuthExtra />}>
                  <Route path="" element={<AuthExtraIndex />}></Route>
                  <Route path="register1" element={<AuthExtraRegister1 />}></Route>
                  <Route path="register2" element={<AuthExtraRegister2 />}></Route>
                  <Route path="register3" element={<AuthExtraRegister3 />}></Route>
                  <Route path="register4" element={<AuthExtraRegister4 />}></Route>
                </Route>
                <Route path="" element={<Navigate to="/extra" />}></Route>
              </Route>
              <Route path="doc" element={<Doc />}></Route>
              <Route path="main" element={<MainLayout />}>
                <Route path="" element={<Main />}></Route>
                <Route path="vote/:id" element={<Vote />}></Route>
                <Route path="vote-success" element={<VoteSuccess />}></Route>
                <Route path="settings" element={<Settings />}>
                  <Route path="" element={<SettingsIndex />}></Route>
                  <Route path="general" element={<SettingsGeneral />}></Route>
                  <Route path="security" element={<SettingsSecurity />}></Route>
                  <Route path="advanced" element={<SettingsAdvanced />}></Route>
                  <Route path="contacts" element={<SettingsContacts />}></Route>
                  <Route path="add-contact" element={<SettingsAddContact />}></Route>
                  <Route path="networks" element={<SettingsNetworks />}></Route>
                  <Route path="add-network" element={<SettingsAddNetwork />}></Route>
                </Route>
                <Route path="add-funds" element={<AddFunds />}>
                  <Route path="" element={<AddFundsIndex />}></Route>
                  <Route path="credit-detail" element={<AddFundsCreditDetail />}></Route>
                </Route>
                <Route path="receive" element={<Receive />}>
                  <Route path="" element={<ReceiveIndex />} ></Route>
                  <Route path="detail/:method" element={<ReceiveDetail />} ></Route>
                  <Route path="qr-code" element={<ReceiveQR_Code />} ></Route>
                </Route>
                {/* <SendContextProvider value={{targetAddrSend, setTargetAddrSend, sendToken, setSendToken, sendAmount, setSendAmount, sendBalance, setSendBalance}}> */}
                <Route path="send" element={<Send />}>
                  <Route path="" element={<SendIndex />} ></Route>
                  <Route path="detail" element={<SendDetail />} ></Route>
                  <Route path="confirm" element={<SendConfirm />} ></Route>
                </Route>
                {/* </SendContextProvider> */}
                
                <Route path="swap" element={<Swap />}>
                  <Route path="" element={<SwapIndex />}></Route>
                  <Route path="confirm" element={<SwapConfirm />}></Route>
                </Route>
                <Route path="transaction-history" element={<TransactionHistory />} ></Route>
                <Route path="fill-kyc" element={<FillKYC />} ></Route>
              </Route>
            </Routes>
          </Router>
          </GlobalContextProvider>
      </AppContextProvider>
    </App>
  );
}

export default AppEX;
