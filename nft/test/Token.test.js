const SupremeNFT=artifacts.require("SupremeNFT");

contract("SupremeNFT", accounts => {
  let contract;
before(async()=>{
contract=  await SupremeNFT.deployed();
})
describe("Deployment()",async function(){
it("Should have name, symbol", async function(){
const name=await contract.name()
assert.equal(name,"SupremeNFT");
})
})
  describe('purchase()', async function() {
    it('Should have 1 total supply', async function() {
      const result=await contract.purchase("google.com", {from:"0xCA85AE9026590eed46055BC94877e9CceE715BD0",value:3*(10**17)})
      const currentPrice=await contract.getCurrentPrice();
      const soldCount=await contract.getSoldCount();
      console.log(currentPrice.toString())
      console.log(soldCount.toString())
      const result1=await contract.purchase("google.com", {from:"0xCA85AE9026590eed46055BC94877e9CceE715BD0",value:3*(10**17)})
      const soldCount1=await contract.getSoldCount();
      console.log(currentPrice1.toString())
      console.log(soldCount1.toString())
      const currentPrice1=await contract.getCurrentPrice();
      const result2=await contract.purchase("google.com", {from:"0xCA85AE9026590eed46055BC94877e9CceE715BD0",value:3*(10**17)})
      const withdraw= await contract.withdraw();
    });
  });
});
