### Quick Intro
The project demonstrates a method to turn a physical/measurable action into an incentive mechanism using a
cryptocurrency. Using a trusted oracle, the measured activity produces the minting of a token to the performer. In this
case, a click is an action rewardable with tokens. Tokens are then transmutable into utility coins on a blockchain
network (equivalent to ether) through a process of burning the token and computing a corresponding amount of coin
according to a deflationary function. The deflation may be a function of the total supply of coin minted. An carefully
crafted transmute function may result in a stable inflation of the currency, similar to that of the PoW method produced
by Bitcoin.


### Run it
This code uses smart contracts defined in [this repository](https://github.com/jaybutera/transmute). ABIs are provided
in this repository but be wary, they must be updated if the contracts are modified.

First run an rpc ethereum client like ganache-cli
```
npm i -g ganache-cli
ganache-cli
```

Deploy the contracts in transmute repository
```
truffle migrate --network development
```

After migration, the contract addresses will print to stdout. Copy the ExampleToken and Transmute address into lines 5&6
of the index.jsx file of this repository.
Finally, compile (tanspile/bundle) the code and check it out
```
npm install
npm run bundle
open index.html
```

### Use it
Click the pile of money to get a token. Web3 will invoke the contract to mint a token for each click. The transmute
button invokes the transmutation contract and results in your account balance increasing for the utility coin.

### Also
The frontend uses [hyperapp](https://github.com/JorgeBucaran/hyperapp), a wonderful lightweight alternative to React.
