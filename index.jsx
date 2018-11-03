import { h, app } from 'hyperapp'
import Web3 from 'web3'

//const web3 = new Web3(web3.currentProvider)

const state = {
   count: 0
}

const actions = {
   inc: () => state => ({ count: state.count + 1 })
}

const view = (state, actions) => (
   <div>
      <h1>{ state.count }</h1>
      <input type="image" src="https://investorplace.com/wp-content/uploads/2013/12/dogecoin.png" onclick={()=>actions.inc()} />
   </div>
)

app(state, actions, view, document.body)
