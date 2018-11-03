import { h, app } from 'hyperapp'
//import Web3 from 'web3'

//const web3 = new Web3(web3.currentProvider)

const state = {}

const actions = {
   inc: () => { new Audio(document.getElementById('chaching').currentSrc).play() }
}

const view = (state, actions) => (
   <div>
      <audio id="chaching" preload="auto">
         <source src="money.mp3" />
      </audio>
      <input type="image" src="http://bestanimations.com/Money/Coins/gold-coins-animated-gif.gif" onclick={()=>actions.inc()} />
   </div>
)

app(state, actions, view, document.body)
