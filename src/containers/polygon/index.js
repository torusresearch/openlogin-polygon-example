/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import OpenLogin from "@toruslabs/openlogin";
import Web3 from "web3";
import Matic from '@maticnetwork/maticjs';
import Network from '@maticnetwork/meta/network';
import { PageHeader, Button } from "antd";
import { useHistory } from "react-router";
import { verifiers } from "../../utils/config";
import "./style.scss";



function Polygon() {
  const [loading, setLoading] = useState(false);
  const [sdk, setSdk] = useState(undefined);
  const [accountInfo, setUserAccountInfo] = useState(null);
  
  const history = useHistory();
  useEffect(() => {
    const web3 = new Web3();
    async function initializeOpenlogin() {
      setLoading(true)
      const sdkInstance = new OpenLogin({ clientId: verifiers.google.clientId, iframeUrl: "http://beta.openlogin.com" });
      await sdkInstance.init();
      if (!sdkInstance.privKey) {
        await sdkInstance.login({
          loginProvider: "google",
          redirectUrl: `${window.origin}/polygon`,
        });
      }

      const account = web3.eth.accounts.privateKeyToAccount(sdkInstance.privKey)
      const { matic, network } = await getMaticClient("mainnet", "v1");
      const tokenAddress = network.Matic.Contracts.Tokens.MaticToken
      matic.setWallet(sdkInstance.privKey);
      let address = account.address;
      const balance = await matic.balanceOfERC20(
        address, //User address
        tokenAddress, // Token address
        {
          parent: false
        }
      )
      setUserAccountInfo({balance, address});
      setSdk(sdkInstance);
      setLoading(false)
    }
    
    initializeOpenlogin();
  }, []);

  async function getMaticClient(_network, _version) {
    const network = new Network(_network, _version);
    console.log(network.Main.RPC, network.Matic.RPC)
    const matic = new Matic({
      network: _network,
      version: _version,
      parentProvider: new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/73d0b3b9a4b2499da81c71a2b2a473a9"),
      maticProvider: new Web3.providers.HttpProvider(network.Matic.RPC)
    })
    await matic.initialize()
    return { matic, network }
  }

  const handleLogout = async () => {
    await sdk.logout();
    history.push("/");
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Openlogin polygon boilerplate"
        extra={[
          <Button key="1" type="primary" onClick={handleLogout}>
            Logout
          </Button>,
        ]}
      />

      {
          loading ?
          <div className="container">
          <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
               <h1>....loading</h1>
               </div>
               </div>
               : 
               <div className="container">
          <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
            <div style={{margin:20}}>
              Wallet address: <i>{accountInfo?.address}</i>
            </div>
            <div style={{margin:20}}>
              Matic ERC20 token Balance: <i>{accountInfo?.balance}</i>
            </div>
            <div style={{margin:20}}>
              Private key: <i>{(sdk && sdk.privKey)}</i>
            </div>
          </div>
        </div>
      }
   
        
    </div>
  );
}

export default Polygon;
