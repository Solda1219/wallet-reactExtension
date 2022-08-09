import { useState } from 'react';
import ComboBoxB from '../../components/ComboBoxB';
import Text from '../../styled-components/Text';
import Button from '../../styled-components/Button';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Success from '../../components/Success';
import Spinner from '../../components/Spinner';
import XButton from '../../styled-components/XButton';
import { useNavigate } from 'react-router';
import SwapContext from '../../context/SwapContextProvider';
import GlobalContext from '../../context/GlobalContextProvider';
import React from 'react';
import Down from '../../components/Icons/Down';
import {getBalance, getBNBBalance} from '../../service/bscCore';


const AmountWarning = styled.div`
    color: ##ff5656;
`;

const AmountWrapper = styled.div`
    position: relative;
    width: 100vw;
    display: flex;
    justify-content: center;
    & ${AmountWarning} {
        position: absolute;
        top: 0;
    }
`


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

const Item = styled.div`
`;

const ListGroup = styled.div`
`

const Selected = styled.div`
`;

const SelectedGroup = styled.div`
    width: 200px;
    position: relative;
    & > ${Selected} {
        border-radius: 10px;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 16px;
        box-sizing: border-box;
        width: 100%;
        height: 44px;
        & img {
            transition: all 0.5s;
        }
    }
    & > ${ListGroup} {
        display: none;
    }
    &.open ${Selected} {
        & img {
            transform: rotate(180deg);
        }
    }
    &.open > ${ListGroup} {
        z-index: 50;
        display: block;
        position: absolute;
        top: 40px;
        margin-top: 5px;
        width: 100%;
        border-radius: 10px;
        background-color: #f0f0f0;
        & ${Item} {
            height: 40px;
            display: flex;
            align-items: center;
            width: 100%;
            padding: 12px 16px;
            box-sizing: border-box;
        }
    }
`;


//need to implement Observable store of @metamask/obs-store for import tokens....
var importedTokens = [
    {name: 'BNB', addr: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {name: 'WBNB', addr: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
    {name: "BUSD", addr: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
]

const requireTokenImg = (address) =>{
    try {
        return require("../../assets/tokens/bscTokens/"+address+".jpg").default;
    }
    catch (e) {
        return require("../../assets/tokens/bscTokens/default.jpg").default;
    }
}

const Index = () => {
    const { address }= React.useContext(GlobalContext);
    const {startTokenSwap, setStartTokenSwap, targetTokenSwap, setTargetTokenSwap, swapAmount, setSwapAmount, gasPrice, gasLimit}= React.useContext(SwapContext);
    const navigate = useNavigate();
    React.useEffect(async ()=>{
        importedTokens= importedTokens.map(one=>{
            return {...one, img: requireTokenImg(one.addr)}
        });
        setStartTokenSwap(importedTokens[0]);
        setTargetTokenSwap(importedTokens[1]);
        setStartAvailable(importedTokens[0], address.addr);
    }, []);
    const [loadingStep, setLoadingStep] = useState(0);
    const [openStart, setOpenStart] = React.useState(false);
    const [openTarget, setOpenTarget] = React.useState(false);
    const [available, setAvailable] = useState(0);
    const setStartAvailable= async (item, wallet)=>
    {
        if(item.name== "BNB"){
            var bal= await getBNBBalance(wallet);
            setAvailable(bal.toFixed(6));
        }
        else{
            var bal= await getBalance(item.addr, wallet);
            setAvailable(bal.toFixed(6));
        }
        
    }
    const getQuateHandler = () => {   
        if(startTokenSwap.name== targetTokenSwap.name){
            return;
        }
        if(swapAmount== 0){
            return;
        }
        if(swapAmount>available){
            return;
        }
        setLoadingStep(1);
        setTimeout(() => {
            setLoadingStep(2);
            setTimeout(() => {
                navigate("/main/swap/confirm");
            }, 1000)
        }, 2000);
    }
    const handleStartClick= (item) =>{
        setStartTokenSwap(item);
        setStartAvailable(item, address.addr);
    }
    const handleTargetClick= (item) =>{
        setTargetTokenSwap(item);
    }
    return (<>
        <div style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <SelectedGroup className={`${openStart ? "open" : ""}`} onClick={() => setOpenStart(oldVal => !oldVal)} style={{
                marginTop: "72px",
                marginBottom: `24px`,
            }}>
                <Selected>
                    <img  width= "20px" src={startTokenSwap.img}/>
                    <Text>{startTokenSwap.name}</Text>
                    <Down width={"13px"} height={"8px"}/>
                </Selected>
                <ListGroup>
                    {importedTokens.map((item, id) => (
                        <Item key={id} onClick={() => handleStartClick(item)}><img style= {{marginRight:'5px'}} width= "20px" src={item.img}/> {item.name}</Item>
                    ))}
                </ListGroup>
            </SelectedGroup>
            <Text style={{
                marginBottom: `20px`,
            }}>Amount</Text>
            <AmountWrapper>
                <AmountWarning>{swapAmount >= available ? `Not enough ${startTokenSwap.name} to complete this swap.` : ""}</AmountWarning>
                <AmountInput style={{
                    marginTop: "23px",
                    marginBottom: "23px"
                }}>
                    <Input onChange={e => setSwapAmount(e.target.value)} value={swapAmount}/>
                </AmountInput>
            </AmountWrapper>
            <Text style={{
                marginBottom: "16px"
            }}>Available: {available}</Text>
            <SelectedGroup className={`${openTarget ? "open" : ""}`} onClick={() => setOpenTarget(oldVal => !oldVal)} style={{
                marginTop: "32px",
                marginBottom: `24px`,
            }}>
                <Selected>
                    <img  width= "20px" src={targetTokenSwap.img}/>
                    <Text>{targetTokenSwap.name}</Text>
                    <Down width={"13px"} height={"8px"}/>
                </Selected>
                <ListGroup>
                    {importedTokens.map((item, id) => (
                        <Item key={id} onClick={() => handleTargetClick(item)}><img style= {{marginRight:'5px'}} width= "20px" src={item.img}/> {item.name}</Item>
                    ))}
                </ListGroup>
            </SelectedGroup>
            { loadingStep === 1 ? (
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                backgroundColor: `rgba(255, 255, 255, 0.75)`,
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Spinner />
            </div>) : ""}
        </div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 0
        }}>
            <Text style={{
                marginRight: `30px`,
            }}>Max Slippage 3%</Text>
            <Button style={{
                width: "123px",
                height: "45px",
                backgroundColor: "#15EA37",
            }} onClick={() => getQuateHandler()}>Get quotes</Button>
        </div>
        <ReactModal 
            isOpen={loadingStep === 2}
            contentLabel="Minimal Modal Example"
            onRequestClose={() => setLoadingStep(0)}
            style={{
                overlay: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                content: {
                    position: 'relative',
                    width: "calc(100% - 120px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "fit-content",
                    inset: 0,
                }
            }}
        >
            <Success />
            <Text>Transaction completed.</Text>
            <XButton onClick={() => setLoadingStep(0)}>X</XButton>
        </ReactModal>
    </>)
}

export default Index;
