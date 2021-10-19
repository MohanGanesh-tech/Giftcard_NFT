import React, { Component } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getWeb3 from "../getWeb3";

import Giftcard from "../contracts/Giftcard.json";
import { create } from 'ipfs-http-client';

import "./Sell_Giftcard.css"

class SellGiftcard extends Component {
    state = { web3: null, accounts: null, contract: null, client: null, giftcardcid: null };

    componentDidMount = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Giftcard.networks[networkId];
        const contract = new web3.eth.Contract(Giftcard.abi, deployedNetwork && deployedNetwork.address,);
  
        this.setState({ web3: web3, accounts: accounts, contract: contract });
        // console.log(this.state.web3,this.state.accounts,this.state.contract)

        const client = create('http://127.0.0.1:5001')
        this.setState({ client: client })

      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    };

  uploaded = async (e) => { 
    const file = e.target.files[0];
    const added = await this.state.client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    console.log(added.path)
    this.setState({ giftcardcid: added.path })
  };

  mint = async (price) => { 
    this.state.contract.methods.mint(this.state.giftcardcid,price).send({ from: this.state.accounts[0] })
  }

  render() {
    if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div>
            <br/>
            <Container>
                <Form onSubmit={(event) => {
                  event.preventDefault()
                  const price = this.price.value
                  this.mint(price)
                }}>  
                    <img src={`https://ipfs.io/ipfs/${this.state.giftcardcid}`} width="250px" height="250px" alt="Not Selected" />
                   
                    <br /><br />
                    <input type="file" onChange={(e) => { this.uploaded(e); }} />
                    <br /><br />

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Price in Ethers" ref={(input) => { this.price = input }} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Mint
                    </Button>
                </Form>
            </Container>
        </div>
    );
  }
}

export default SellGiftcard;
