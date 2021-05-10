import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import SupremeNFT from "../abis/BruhNFT.json";
import bruhbucksIcon from "./bruhbucks-icon.jpg";
import nftIcon from './space-invader-gif-2.gif';
class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected or wrong network. Please switch to BSC TestNet and/or install metmask.Then Refresh the page!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
  //  const networkData = SupremeNFT.networks[networkId];
  //  if (networkData) {
  try{

      const abi = SupremeNFT.abi;
      //const address = networkData.address;
      const contract = new web3.eth.Contract(abi,'0xaA92FbBc39064f7F90aF87ccA9AD7cacEA5972F2');
      this.setState({ contract });
      const tokenId = await contract.methods.getSoldCount().call();
      const maxTokens = await contract.methods.getMaxTokens().call();
    const currentPrice = await contract.methods.getCurrentPrice().call();
    let currentPriceToWei= window.web3.utils.fromWei(currentPrice, "ether");
      var percentage=tokenId/maxTokens*100 +"%";
      tokenId.toString();
      maxTokens.toString();
      this.setState({ maxTokens });
      this.setState({ tokenId });
      this.setState({percentage});
      this.setState({currentPrice});
      this.setState({currentPriceToWei})
      console.log(currentPrice)
      console.log(tokenId)
      contract.events
        .TokenMinted({
          filter: {},
          function(error, event) {
            console.log(event, "FUCK");
          }
        })
        .on("connected", function(subscriptionId) {})
        .on("data", async (event) => {
          console.log(event.returnValues.tokenId, "data"); // same results as the optional callback above
          this.setState({ tokenId: event.returnValues.tokenId });
          this.setState({percentage:(this.state.tokenId/event.returnValues.maxTokens)*20+'em'})
      const currentPrice = await contract.methods.getCurrentPrice().call();
    let currentPriceToWei= window.web3.utils.fromWei(currentPrice, "ether");
  this.setState({currentPrice:currentPrice})
      this.setState({currentPriceToWei})
        })
        .on("changed", function(event) {
          console.log(event, "changed");
        })
        .on("error", function(error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          console.log(error, "jkjkkkkk");
        });
      }
      catch(err){
                     window.alert(
                            "Change network to Bsc and try again."
                          );
      }
  //  } else {
   // }
  }

  purchase = () => {
    console.log(this.state);
    try{
      if(parseInt(this.state.tokenId)<parseInt(this.state.maxTokens))
      {
    this.state.contract.methods
      .purchase("gs://bruhstorage-b772a.appspot.com/space-invader-gif-2.gif")
      .send({ from: this.state.account, value: this.state.currentPrice})
      .once("receipt", receipt => {
        console.log(receipt, "RECEIPT");
      }).once("error",error=>{
                     window.alert(
                            "Canceled transaction or possible error. Please try again"
                          );
       });
     }
     else{
       console.log(this.state.tokenId,"jkjk",this.state.maxTokens);
       console.log(parseInt(this.state.tokenId)<parseInt(this.state.maxTokens));
                     window.alert(
                            "Sold Out"
                          );
     }
    }
    catch(error){
                     window.alert(
                            "Connect to Bsc Network and refresh"
                          );
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      tokenId: -1,
      maxTokens: 100,
      percentage:'0%',
      currentPrice:'1000000000000',
      currentPriceToWei:"10"
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow">
        <div class="logo"><span class="wsite-logo">


</span></div>
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.bruhbucks.com/"
            target="_blank"
            rel="noopener noreferrer"
          >

		<img className="logo" src={bruhbucksIcon} alt="Bruh Bucks! Enter the Bruhverse!"></img>
        Back To Main Site
          </a>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-black">
                <span style={{color:"white"}} id="account">{this.state.account}</span>
              </small>
            </li>
          </ul>
        </nav>

        <div className="container-fluid centering-container mt-5">
          <div className="row center">
            <div>
              <p
                className="clock center-horizontal"
                style={{ color: "white", fontSize: "100%" }}
              >
                <span  style={{ color: "white", fontSize: "100%" }}className="center-horizontal" id="datetime">
                Bruh Bucks NFT SHOP BETA
                </span>
              </p>
            </div>
          </div>
          <div className="row center" style={{marginTop:'1em'}}>
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <div className="row">
                  {/*<img
                    className="brz-img brz-p-absolute"
                    style={{ height: "50%", width:'350px',marginTop:'3%',marginRight:"3%"}}
                    srcSet="https://firebasestorage.googleapis.com/v0/b/supremebsc-69696.appspot.com/o/nft1.png?alt=media&token=8107021d-a1f2-4913-a0cf-dc8e2ea486e7
1x,
https://firebasestorage.googleapis.com/v0/b/supremebsc-69696.appspot.com/o/nft1.png?alt=media&token=8107021d-a1f2-4913-a0cf-dc8e2ea486e7
 2x"
                    src="https://firebasestorage.googleapis.com/v0/b/supremebsc-69696.appspot.com/o/nft1.png?alt=media&token=8107021d-a1f2-4913-a0cf-dc8e2ea486e7"
                    alt=""
                    draggable="false"
                    loading="lazy"
                  ></img>*/}
                  <div style={{marginRight:"30px"}}>
                  <img
                    className="brz-img brz-p-absolute"
                    style={{border:"5px solid white",borderRadius:"100px" ,height: "50%", width:'350px',marginTop:'3%',marginRight:"3%",borderColor:"white"}}
                    src={nftIcon}
                    alt=""
                    draggable="false"
                    loading="lazy"
                  ></img>
                  </div>
                  <div style={{ width: "45%" }}>
                    <div
                      className="brz-rich-text brz-css-reawq"
                      style={{ textAlign: "left" }}
                    >
                      <div className="space">
                        <p className="brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-400 brz-fw-sm-im-400 brz-fw-xs-im-400 brz-fs-lg-16 brz-fs-sm-im-15 brz-fs-xs-im-15">
                          <span className="brz-cp-color7">NFT Name: <b> Bruh Origins</b>{" "}</span>
                        </p>
                        <p className="brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-700 brz-fw-sm-im-700 brz-fw-xs-im-700 brz-fs-lg-18 brz-fs-sm-im-17 brz-fs-xs-im-17">
                          <p className="brz-cp-color7 ">


                  <p style={{display:"inline"}}>This NFT represents what it was like in the beginning, being there before the Bruhverse even came into existence. As we grow and change we can never forget our Origin.</p>
                          </p>
                        </p>
                      </div>
<div className="space">
                        <p className="brz-cp-color7 brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-fs-lg-16 brz-fs-sm-im-15 brz-fs-xs-im-15 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-400 brz-fw-sm-im-400 brz-fw-xs-im-400">
                          <span className="brz-cp-color7">
                            Price: {this.state.currentPriceToWei} BNB
                          </span>
                        </p>
                        </div>
                      <p className="brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-fs-lg-16 brz-fs-sm-im-15 brz-fs-xs-im-15 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-400 brz-fw-sm-im-400 brz-fw-xs-im-400">
                        <span className="brz-cp-color7">
                          Bsc NFT Contract address: 0x4F5EB4F98054Ed1A0c8D93D49fC3Fd6ec588eD9b
                        </span>
                      </p>

                    </div>
                    <form
                      onSubmit={event => {
                        try {
                          event.preventDefault();
                          this.purchase();
                        } catch (error) {
                          window.alert(
                            "Please swithc to bsc testnet then REFRESH"
                          );
                        }
                      }}
                    >
                      {/*<input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. #FFFFFF'
                    ref={(input) => { this.color = input }}
                  />*/}
                  {this.state.tokenId>=0?

                      <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buy now"
                        style={{marginBottom:'1.5%'}}
                      />
                  :<p style={{color:"white"}}> Connecting to Metamask</p>    
                  }
                    </form>
                    <div
                      style={{
                        backgroundColor: "white",
                        width:'20em',
                        height:'2em',
                        textAlign:'left',
                      }}
                    >
                    <div className="brz-css-zfbiq brz-css-nntxk brz-wrapper" style={{height:'2em',backgroundColor:"red",width:this.state.percentage}}>
                    <div data-type="style1" className="brz-progress-bar brz-progress-bar-style1 brz-css-tajqp brz-css-qepck" data-custom-id="chlhvjlrlqljldbfnpuvgfaosbjtuqjvibfv">

                    <div className="brz-d-xs-flex brz-justify-content-xs-between brz-align-items-xs-center brz-progress-bar__wrapper brz-css-psjbo brz-css-nufzj" data-progress="60" style={{maxWidth:" 61%"}}></div></div></div>
                    </div>
                    <p style={{textAlign:'left',color:"white"  }}>
                    {this.state.tokenId}/{this.state.maxTokens} sold
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="row text-center"></div>
        </div>
      </div>
    );
  }
}

export default App;
