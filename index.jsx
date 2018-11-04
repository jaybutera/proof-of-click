import { h, app } from 'hyperapp'
import Web3 from 'web3'

// Contract ABIs used for web3
import ETabi from './abis/ExampleToken.json'
import TransmuteAbi from './abis/Transmute.json'

// Deployed contract addresses go here
const ETaddr        = '0xffe7175d93dc73f6bdfea632fc46f83015341e5c'
const TransmuteAddr = '0x6931451def1999457b8e82b223b1d2802ab29b23'

const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545"))

const state = {
   token: 0, // Token reward for clicks
   coin: 0   // Utility coin
}

const actions = {
   click: () => async (state, actions) => {
      // Play a fun sound
      new Audio(document.getElementById('chaching').currentSrc).play()

      const addr = (await web3.eth.getAccounts())[0]
      const token = new web3.eth.Contract(ETabi, ETaddr)

      // Mint tokens to clicker and update UI
      await token.methods.mint(addr, 1).send({from: addr})
      actions.u_token(await token.methods.balanceOf(addr).call({from:addr}))
   },
   coin_bal: () => async (state, actions) => {
      const addr = (await web3.eth.getAccounts())[0]
      const bal  = Number(web3.utils.fromWei(await web3.eth.getBalance(addr), 'ether'))
      actions.u_coin( (bal).toFixed(3) )
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
      // Allow transmute contract to convert tokens into coin, and send back to clicker
      console.log( await token.methods.approve(TransmuteAddr, tbal).send({from:addr}) )
      console.log( await contract.methods.transformFrom(addr, tbal).send({from:addr}) )
      // Update UI
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

      <br />

      <div style={{color:"#404040", fontFamily:"Helvetica", fontSize:"100px"}}>
         { state.token }
         <button style={{height:"60px"}} onclick={()=>actions.transmute()}>REWARDZ</button>
         { state.coin }
      </div>

      </center>

   </div>
)

app(state, actions, view, document.body)
