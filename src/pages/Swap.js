import { Outlet } from "react-router";
import styled from "styled-components";
import {SwapContextProvider} from '../context/SwapContextProvider';
import React from 'react';

const SwapLayout = styled.div`
    padding: 44px 38px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 50px - ${44 * 2}px);
`;

const Swap = () => {
      //swap
    const [startTokenSwap, setStartTokenSwap] = React.useState('');
    const [targetTokenSwap, setTargetTokenSwap] = React.useState('');
    const [swapAmount, setSwapAmount]= React.useState(0);
    const [gasPrice, setGasPrice] = React.useState(20);
    const [gasLimit, setGasLimit] = React.useState(100000);
    return (<SwapLayout>
        <SwapContextProvider value= {{
            startTokenSwap,
            setStartTokenSwap,
            targetTokenSwap,
            setTargetTokenSwap,
            swapAmount,
            setSwapAmount,
            gasPrice,
            setGasPrice,
            gasLimit,
            setGasLimit
        }}>
            <Outlet />
        </SwapContextProvider>
        
    </SwapLayout>)
}

export default Swap;