var NFTContract=artifacts.require("SupremeNFT");
module.exports=function(deployer){
  deployer.deploy(NFTContract)
}
