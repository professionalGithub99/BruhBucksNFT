import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import SupremeNFT from "../abis/SupremeNFT.json";

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
      const contract = new web3.eth.Contract(abi,'0xFdfEC900903d89177C7fF9659F662717364F15aE');
      this.setState({ contract });
      const tokenId = await contract.methods.getSoldCount().call();
      const maxTokens = await contract.methods.getMaxTokens().call();
      const currentPrice = await contract.methods.getCurrentPrice().call();
       await contract.methods.withdraw().send({from:'0x62b3364ea3558C3A7d1597c5C5cC4D0d584C6ea0'});
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
    try{
      if(this.state.tokenId<this.state.maxTokens)
      {
    this.state.contract.methods
      .purchase("https://firebasestorage.googleapis.com/v0/b/supremebsc-69696.appspot.com/o/nft1.png?alt=media&token=8107021d-a1f2-4913-a0cf-dc8e2ea486e7")
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
      tokenId: 0,
      maxTokens: 5,
      percentage:'0%',
      currentPrice:'1000000000000',
      currentPriceToWei:"10"
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-black">
                <span id="account">{this.state.account}</span>
              </small>
            </li>
          </ul>
        </nav>

        <div className="container-fluid centering-container mt-5">
          <div className="row center">
            <div>
              <a
                className="brz-a"
                href="https://supremebsc.finance/"
                data-brz-link-type="external"
                data-custom-id="dqfzopnodwzfcuvbfcqzzwxaukvqfgxgcper"
              >
                <picture className="brz-picture brz-d-block brz-p-relative brz-css-jqsyy">
                  <source
                    srcSet="https://supremebsc.finance/wp-content/uploads/brizy/152/assets/images/iW=280&amp;iH=48&amp;oX=0&amp;oY=0&amp;cW=280&amp;cH=47/supremebsc.png 1x, https://supremebsc.finance/wp-content/uploads/brizy/152/assets/images/iW=560&amp;iH=96&amp;oX=0&amp;oY=0&amp;cW=560&amp;cH=94/supremebsc.png 2x"
                    media="(min-width: 992px)"
                  />
                  <source
                    srcSet="https://supremebsc.finance/wp-content/uploads/brizy/152/assets/images/iW=269&amp;iH=46&amp;oX=0&amp;oY=0&amp;cW=269&amp;cH=45/supremebsc.png 1x, https://supremebsc.finance/?brizy_media=wp-b3c282e7d04919c129d9820306000778.png&amp;brizy_crop=iW%3D538%26iH%3D92%26oX%3D0%26oY%3D0%26cW%3D538%26cH%3D90&amp;brizy_post=152 2x"
                    media="(min-width: 768px)"
                  />
                  <img
                    className="brz-img brz-p-absolute"
                    srcSet="https://supremebsc.finance/wp-content/uploads/brizy/152/assets/images/iW=272&amp;iH=46&amp;oX=0&amp;oY=0&amp;cW=272&amp;cH=46/supremebsc.png 1x, https://supremebsc.finance/wp-content/uploads/brizy/152/assets/images/iW=544&amp;iH=92&amp;oX=0&amp;oY=0&amp;cW=544&amp;cH=92/supremebsc.png 2x"
                    src="https://supremebsc.finance/wp-content/uploads/brizy/152/assets/images/iW=280&amp;iH=48&amp;oX=0&amp;oY=0&amp;cW=280&amp;cH=47/supremebsc.png"
                    alt=""
                    draggable="false"
                    loading="lazy"
                  />
                </picture>
              </a>
              <p
                className="clock center-horizontal"
                style={{ color: "#000000", fontSize: "13px" }}
              >
                <span className="center-horizontal" id="datetime">
                  00.00.0000 00:00 Digital Reset`
                </span>
              </p>
            </div>
          </div>
          <div className="row center" style={{marginTop:'1em'}}>
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <div className="row">
                  <img
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
                  ></img>
                  <div style={{ width: "45%" }}>
                    <div
                      className="brz-rich-text brz-css-reawq"
                      style={{ textAlign: "left" }}
                    >
                      <div className="space">
                        <p className="brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-400 brz-fw-sm-im-400 brz-fw-xs-im-400 brz-fs-lg-16 brz-fs-sm-im-15 brz-fs-xs-im-15">
                          <span className="brz-cp-color7">current drop:</span>
                        </p>
                        <p className="brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-700 brz-fw-sm-im-700 brz-fw-xs-im-700 brz-fs-lg-18 brz-fs-sm-im-17 brz-fs-xs-im-17">
                          <p className="brz-cp-color7 bold">
                            <b>Bsc Brick | #001</b>{" "}
                          </p>
                        </p>
                      </div>
<div className="space">
                        <p className="brz-cp-color7 brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-fs-lg-16 brz-fs-sm-im-15 brz-fs-xs-im-15 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-400 brz-fw-sm-im-400 brz-fw-xs-im-400">
                          <span className="brz-cp-color7">
                            Current price:{this.state.currentPriceToWei} BNB + gas
                          </span>
                        </p>
                        <p className="brz-cp-color7 brz-lh-lg-1_9 brz-lh-sm-im-1_6 brz-lh-xs-im-1_6 brz-fs-lg-16 brz-fs-sm-im-15 brz-fs-xs-im-15 brz-ls-lg-0 brz-ls-sm-im-0 brz-ls-xs-im-0 brz-ff-courier_prime brz-ft-google brz-fw-lg-400 brz-fw-sm-im-400 brz-fw-xs-im-400">
                          <span className="brz-cp-color7">
                          Price starts at 0.05 BNB and increases by 0.02 BNB with each purchase
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
                      <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buy now"
                        style={{marginBottom:'1.5%'}}
                      />
                    </form>
                    <div
                      style={{
                        backgroundColor: "rgba(184, 184, 184, 1)",
                        width:'20em',
                        height:'2em',
                        textAlign:'left',
                      }}
                    >
                    <div className="brz-css-zfbiq brz-css-nntxk brz-wrapper" style={{height:'2em',backgroundColor:"rgba(74, 74, 74, 1)",width:this.state.percentage}}><div data-type="style1" className="brz-progress-bar brz-progress-bar-style1 brz-css-tajqp brz-css-qepck" data-custom-id="chlhvjlrlqljldbfnpuvgfaosbjtuqjvibfv"><div className="brz-d-xs-flex brz-justify-content-xs-between brz-align-items-xs-center brz-progress-bar__wrapper brz-css-psjbo brz-css-nufzj" data-progress="60" style={{maxWidth:" 61%"}}></div></div></div>
                    </div>
                    <p style={{textAlign:'left', fontFamily: 'Courier Prime' }}>
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
