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
      <input type="image" src="https://investorplace.com/wp-content/uploads/2013/12/dogecoin.png" onclick={()=>actions.inc()} />
   </div>
)

app(state, actions, view, document.body)
