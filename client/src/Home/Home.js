import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import getWeb3 from "../getWeb3";

import Giftcard from "../contracts/Giftcard.json";
import "./Home.css";


class Home extends Component {
    state = { web3: null, accounts: null, contract: null, giftcards: [] };

    componentDidMount = async () => {
      try {
        const web3 = await getWeb3();
  
        const accounts = await web3.eth.getAccounts();
  
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Giftcard.networks[networkId];
        const instance = new web3.eth.Contract(Giftcard.abi, deployedNetwork && deployedNetwork.address,);
  
        this.setState({ web3: web3, accounts: accounts, contract: instance });
        // console.log(this.state.web3,this.state.accounts,this.state.contract)

        const totalSupply = await this.state.contract.methods.totalSupply().call()
        this.setState({ totalSupply })
        for (var i = 1; i <= totalSupply; i++) {
          const giftcard = await this.state.contract.methods.giftcards(i - 1).call()
          const myntf = await this.state.contract.methods.getGiftcardntf(i).call()
          const ntfowner = await this.state.contract.methods.getowner(i).call()
          this.setState({ giftcards: [...this.state.giftcards, [giftcard, myntf[0], myntf[1], ntfowner]] })

        }
        console.log(this.state.giftcards)
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    };

    async handleClick(id, owner, price) {

      this.state.web3.eth.sendTransaction({
        to: owner, 
        from: this.state.accounts[0], 
        value: this.state.web3.utils.toWei(price, "ether")
      }, console.log)

      const got = await this.state.contract.methods.buy(id).send({ from: this.state.accounts[0] })
      console.log(got)
    }

  render() {
    if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div>
            <br/>

          <Container>
          <Row xs={1} md={4} className="g-4">
            {this.state.giftcards.map((giftcard, key) => (
              <Col key={key+1}>
                <Card>
                  <Card.Img variant="top" src={`https://ipfs.io/ipfs/${giftcard[0]}`} height='180px' />
                  <Card.Body>
                    <Card.Title>
                      Ethers: {giftcard[1]} 
                    </Card.Title>
                    <Card.Text>
                    Owner: <p>{giftcard[3]}</p>
                      <Button onClick={() => this.handleClick( key+1, giftcard[3], giftcard[1] )}>Buy</Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          </Container>
        </div>
    );
  }
}

export default Home;
