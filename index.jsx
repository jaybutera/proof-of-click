import { h, app } from 'hyperapp'
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545"))
console.log(Web3.givenProvider)
//web3.eth.getAccounts().then(console.log)

const state = {
   token: 0,
   coin: 0
}

const actions = {
   inc: () => { new Audio(document.getElementById('chaching').currentSrc).play() },
   coin_bal: () => async (state, actions) => {
      const addr = (await web3.eth.getAccounts())[0]
      const bal  = Number(web3.utils.fromWei(await web3.eth.getBalance(addr), 'ether'))
      actions.u({ coin: bal })
   },
   u: (x) => state => (x)
}

const view = (state, actions) => (
   <div>
      <audio id="chaching" preload="auto">
         <source src="money.mp3" />
      </audio>
   <center>
      <input type="image" src="http://bestanimations.com/Money/Coins/gold-coins-animated-gif.gif" onclick={()=>actions.inc()} />
   </center>
   <button onclick={()=>actions.coin_bal()}>Do it</button>
   { state.coin }
   </div>
)

app(state, actions, view, document.body)
