import { h, app } from 'hyperapp'

const state = {
   count: 0
}

const actions = {
   inc: () => state => ({ count: state.count + 1 })
}

const Image = ({url}) => (
   <img
      style={{
         width:"100px",
         height:"100px"
      }}>
   <img src={url} />
   </div>
)

const view = (state, actions) => (
   <div>
      <Image url="http://pre03.deviantart.net/a815/th/pre/i/2016/027/e/f/portrait_of_marina_nery_by_nad4r-d9pi6qd.jpg" />
      <h1>{ state.count }</h1>
      <button onclick={() => actions.inc()}>+</button>
   </div>
)

app(state, actions, view, document.body)
