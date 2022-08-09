import Text from "../../styled-components/Text";
import ComboBoxB from '../../components/ComboBoxB';
import styled from "styled-components";
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../../styled-components/Button';
import GlobalContext from '../../context/GlobalContextProvider';
import SendContext from '../../context/SendContextProvider';
import React, { useContext } from 'react'
import Down from '../../components/Icons/Down';
import {getBalance, getBNBBalance} from '../../service/bscCore';


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

const Detail = () => {
    const { address }= React.useContext(GlobalContext);
    const {sendToken, setSendToken, sendAmount, setSendAmount, sendBalance, setSendBalance}= React.useContext(SendContext);
    React.useEffect(async ()=>{
        importedTokens= importedTokens.map(one=>{
            return {...one, img: requireTokenImg(one.addr)}
        });
        setSendToken(importedTokens[0]);
        await setSendBalanceClick(importedTokens[0], address.addr);
    }, []);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const setSendBalanceClick= async (item, wallet)=>
    {
        if(item.name== "BNB"){
            var bal= await getBNBBalance(wallet);
            setSendBalance(bal.toFixed(6));
        }
        else{
            var bal= await getBalance(item.addr, wallet);
            setSendBalance(bal.toFixed(6));
        }
        
    }
    const handleClick= async (item)=>{
        setSendToken(item);
        await setSendBalanceClick(item, address.addr)
    }
    const handleSendAmount= (e)=>{
        setSendAmount(e.target.value)
    }
    const handleSubmit= () =>{
        if(parseFloat(sendAmount).toString().includes('NaN')){
            return
        }
        if(sendAmount== 0){
            return
        }
        if(sendAmount > sendBalance){
            return
        }
        else{
            navigate("/main/send/confirm");
        }
    }
    return (<>
        <SelectedGroup className={`${open ? "open" : ""}`} onClick={() => setOpen(oldVal => !oldVal)} style={{
                marginTop: "72px",
                marginBottom: `34px`,
            }}>
            <Selected>
            <img  width= "20px" src={sendToken.img}/>
            <Text>{sendToken.name}</Text>
                <Down width={"13px"} height={"8px"}/>
            </Selected>
            <ListGroup>
            {importedTokens.map((item, id) => (
                <Item key={id} onClick={() => handleClick(item)}><img style= {{marginRight:'5px'}} width= "20px" src={item.img}/> {item.name}</Item>
            ))}
            </ListGroup>
        </SelectedGroup>

        <Text style={{
            marginBottom: "30px"
        }}>Amount</Text>
        
        <AmountInput style={{
            marginBottom: "25px"
        }}>
            <Input value= {sendAmount} onChange={(e) => handleSendAmount(e)}/>
        </AmountInput>
        <Text style={{
            marginBottom: "73px"
        }}>Balance: {sendBalance}</Text>
        <Footer>
            <Button style={{
                width: "123px",
                height: "45px",
                backgroundColor: "#15EA37"
            }}
            onClick= {handleSubmit} >Next</Button>
        </Footer>
    </>)
}

export default Detail;