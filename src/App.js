import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
function App() {
  const Web3 = require("web3");
  const [contract, setContract] = useState();
  const [transactionData, setTransactionData] = useState();
  const abi1 = require("./Hello.json");
  const address = "0x5086e525c88115dD37124B8b21C8eE2936aEA414";
  useEffect(() => {
    addWalletListener();
  }, []);
  const [account, setAccount] = useState();
  const [message, setMessage] = useState();
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);

    const web3 = new Web3(
      "https://eth-goerli.g.alchemy.com/v2/MAUI9GNGgSgL9KbBXvolXsXdGerA1UAo"
    );
    const x = new web3.eth.Contract(abi1.abi, address);
    setContract(x);
  };
  async function sayHello() {
    if (contract) {
      const tx = await contract.methods.sayHello(message).call();
      setTransactionData(tx);
    } else {
      alert("connect to wallet first");
    }
  }
  const style1 = {
    paddingLeft: "800px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>LET'S INTERACT</h1>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={web3Handler}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message Display"
      />
      <br></br>
      <br></br>
      <button onClick={sayHello}>Done</button>
      <br></br>
      <p>
        {transactionData
          ? `Message: ${transactionData}`
          : "--------------------"}
      </p>
    </div>
  );
}

export default App;
