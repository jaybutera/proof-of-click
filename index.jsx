import { h, app } from 'hyperapp'
import Web3 from 'web3'
import ETabi from './abis/ExampleToken.json'
import TransmuteAbi from './abis/Transmute.json'

const ETaddr = '0xb863e9df9c9b860d3a8fdec4298fc1c8d8b4fc8a'
const TransmuteAddr = '0xbe99cd10447142431d312cdde568789548fef4f5'

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545"))
console.log(Web3.givenProvider)

const state = {
   token: 0,
   coin: 0
}

const actions = {
   inc: () => { new Audio(document.getElementById('chaching').currentSrc).play() },
   click: () => async (state, actions) => {
      const addr = (await web3.eth.getAccounts())[0]
      const token = new web3.eth.Contract(ETabi, ETaddr)
      await token.methods.mint(addr, 1).send({from: addr})
      actions.u_token(await token.methods.balanceOf(addr).call({from:addr}))
   },
   coin_bal: () => async (state, actions) => {
      const addr = (await web3.eth.getAccounts())[0]
      const bal  = Number(web3.utils.fromWei(await web3.eth.getBalance(addr), 'ether'))
      actions.u_coin( bal )
   },
   //u: (x) => state => (x)
   u_coin: (x) => state => ({ coin: x }),
   u_token: (x) => state => ({ token: x }),
   transmute: () => async (state, actions) => {
      const addr = (await web3.eth.getAccounts())[0]
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
   <button onclick={()=>actions.coin_bal()}>Do it</button>
   { state.coin }
   { state.token }
   </div>
)

app(state, actions, view, document.body)
