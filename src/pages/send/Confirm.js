import Text from "../../styled-components/Text";
import styled from 'styled-components';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../../styled-components/Button';
import GlobalContext from '../../context/GlobalContextProvider';
import SendContext from '../../context/SendContextProvider';
import React, { useContext } from 'react';
import {sendTokens, isValidAddress} from '../../service/bscCore';

import { InputBox } from './Index';

const Input = styled.input``;
const AmountInput = styled.div`
    width: 200px;
    height: 59px;
    text-align: center;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
    border-radius: 1000px;
    border: none;
    outline: none;
    & ${Input} {
        border: none;
        border-bottom: 1px solid black;
        width: 89px;
        height: 48px;
        text-align: center;
        &:active, &:focus {
            outline: none;
        }
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    height: 45px;
`;


const Confirm = () => {
    const { address }= React.useContext(GlobalContext);
    const {sendToken, targetAddrSend, setSendToken, sendAmount, setSendAmount, sendBalance, setSendBalance}= React.useContext(SendContext);
    var gasPrice= 5;
    var gasLimit= 21000;
    const handleSend= async()=>{
        if(sendToken.name== "BNB"){

        }
        else{
            if(isValidAddress(targetAddrSend) && sendAmount!=0 && sendAmount<sendBalance){
                await sendTokens({tokenAddress: sendToken.addr,tokenAmount: sendAmount,targetAddress:targetAddrSend, publicKey: address.addr, privateKey: address.key, gasPrice , gasLimit})
            }
            
        }
    }
    
    return (<>
        <Text style={{
            marginBottom: "5px",
        }}>From:</Text>
        <InputBox style={{
            marginBottom: "20px"
        }} value={address.name} placeholder={`Account 1`} disabled></InputBox>
        <Text style={{
            marginBottom: "-6px"
        }}>To:</Text>
        <InputBox style={{
            marginBottom: "26px"
        }} value={targetAddrSend} placeholder={`Account 2`} disabled></InputBox>
        <Text style={{
            marginBottom: "26px",
            fontSize: "18px"
        }}>Amount</Text>
        <AmountInput style={{
            marginBottom: "25px"
        }} >
            <Input  value= {sendAmount} disabled/>
        </AmountInput>
        <Text style={{
            marginBottom: "30px"
        }}>Balance: {sendBalance}</Text>
        <Footer>
            <Button style={{
                width: "123px",
                height: "45px",
                backgroundColor: "#15EA37"
            }} onClick={handleSend} >Confirm</Button>
        </Footer>
    </>)
}

export default Confirm;