import { h, app } from 'hyperapp'
import Web3 from 'web3'
import ETabi from './abis/ExampleToken.json'
import TransmuteAbi from './abis/Transmute.json'

const ETaddr = '0x6bc8aea230be09affb9b1791fcbf0a8b62423f19'
const TransmuteAddr = '0xccbcf865ce791688110228895761ee895d875a74'

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545"))
console.log(Web3.givenProvider)

const state = {
   token: 0,
   coin: 0
}

const actions = {
   click: () => async (state, actions) => {
      new Audio(document.getElementById('chaching').currentSrc).play()
      const addr = (await web3.eth.getAccounts())[0]
      const token = new web3.eth.Contract(ETabi, ETaddr)
      await token.methods.mint(addr, 1).send({from: addr})
      actions.u_token(await token.methods.balanceOf(addr).call({from:addr}))
   },
   coin_bal: () => async (state, actions) => {
      const addr = (await web3.eth.getAccounts())[0]
      const bal  = Number(web3.utils.fromWei(await web3.eth.getBalance(addr), 'ether'))
      actions.u_coin( (bal - 90).toFixed(3) )
      actions.u_token( 0 )
   },
   //u: (x) => state => (x)
   u_coin: (x) => state => ({ coin: x }),
   u_token: (x) => state => ({ token: x }),
   transmute: () => async (state, actions) => {
      const addr = (await web3.eth.getAccounts())[0]
      // Get token balance
      const token = new web3.eth.Contract(ETabi, ETaddr)
      const tbal  = await token.methods.balanceOf(addr).call({from:addr})
      // Transmute
      const contract = new web3.eth.Contract(TransmuteAbi, TransmuteAddr)
      console.log( await token.methods.approve(TransmuteAddr, tbal).send({from:addr}) )
      console.log( await contract.methods.transformFrom(addr, tbal).send({from:addr}) )
      actions.coin_bal()
   }
}

const view = (state, actions) => (
   <div>
      <audio id="chaching" preload="auto">
         <source src="money.mp3" />
      </audio>
   <center>
      <input type="image" src="http://bestanimations.com/Money/Coins/gold-coins-animated-gif.gif" onclick={()=>actions.click()} />
   </center>

   <br />
   <center>
   <div style={{color:"#404040", fontFamily:"Helvetica", fontSize:"100px"}}>
      { state.token }
      <button style={{height:"60px"}} onclick={()=>actions.transmute()}>REWARDZ</button>
      { state.coin }
   </div>
   </center>
   </div>
)

app(state, actions, view, document.body)
