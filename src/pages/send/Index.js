import Text from "../../styled-components/Text";
import Input from "../../styled-components/Input";
import styled from "styled-components";
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../../styled-components/Button';
import GlobalContext from '../../context/GlobalContextProvider';
import SendContext from '../../context/SendContextProvider';
import React, { useContext } from 'react';
import {isValidAddress} from '../../service/bscCore';


export const InputBox = styled(Input)`
    border: none;
    height: 45px;
    text-align: center;
    outline: none;
    width: 85%;
    margin-top: 16px;
    margin-bottom: 16px;
`;
const Footer = styled.div`
    display: flex;
    align-items: center;
    height: 45px;
`;

const Index = () => {
    const {address}= React.useContext(GlobalContext);
    const {targetAddrSend, setTargetAddrSend}= React.useContext(SendContext);
    const navigate = useNavigate();
    const handleTargetAddr = (e) => {
        setTargetAddrSend(e.target.value);
    };
    const handleClick= () =>{
        
        if(!targetAddrSend){
            return
        }

        if(!isValidAddress(targetAddrSend)){
            return
        }
        if(address.addr== targetAddrSend){
            return
        }
        else{
            navigate("/main/send/detail");
        }
    }
    return (<>
        <Text style={{
            marginTop: "34px",
            marginBottom: "21px"
        }}>From:</Text>
        <InputBox style={{
            marginBottom: "21px"
        }} value={address.name} placeholder={`Account 1`} disabled></InputBox>
        <Text style={{
            marginBottom: "12px"
        }}>To:</Text>
        <InputBox style={{
            marginBottom: "50px"
        }} value={targetAddrSend}
        onChange={(e) => handleTargetAddr(e)} placeholder={`Add address, search or read qr`}></InputBox>
        <Text style={{
            marginBottom: "98px"
        }}>Transfer between my accounts</Text>
        <Footer>
            <Button style={{
                width: "123px",
                height: "45px",
                backgroundColor: "#15EA37"
            }} onClick={handleClick} >Next</Button>
        </Footer>
    </>)
}

export default Index;