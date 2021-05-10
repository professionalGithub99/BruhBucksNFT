var TokenContract=artifacts.require("BEP20Token.sol");
module.exports=function(deployer){
  deployer.deploy(TokenContract)
}
