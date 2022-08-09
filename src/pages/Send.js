import styled from 'styled-components';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Text from '../styled-components/Text';
import Button from '../styled-components/Button';
import ScrollContainer from "react-indiana-drag-scroll";
import GlobalContext from '../context/GlobalContextProvider';
import {SendContextProvider} from '../context/SendContextProvider'
import React, { useContext } from 'react'

const SendLayout = styled.div`
    padding: 31px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 50px - 62px);
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    height: 45px;
`;

const baseUrl = "/main/send"
const subUrls = [
    "",
    "/detail",
    "/confirm"
]
const toSubUrls = [
    `${baseUrl}/detail`,
    `${baseUrl}/confirm`,
    `/`,
]

const Send = () => {
    //send
    const [targetAddrSend, setTargetAddrSend] = React.useState('');
    const [sendToken, setSendToken] = React.useState('');
    const [sendAmount, setSendAmount] = React.useState(0);
    const [sendBalance, setSendBalance] = React.useState(0);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <SendLayout>
            <Text style={{
                marginBottom: `18px`,
            }}>Send</Text>
            <ScrollContainer style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '90%',
            }} vertical={true} horizontal={false} hideScrollbars={true}>
                <SendContextProvider value= {{
                    targetAddrSend,
                    setTargetAddrSend,
                    sendToken,
                    setSendToken,
                    sendAmount,
                    setSendAmount,
                    sendBalance,
                    setSendBalance
                }}>
                    <Outlet />
                </SendContextProvider>
            </ScrollContainer>
            
        </SendLayout>
    )
}

export default Send;