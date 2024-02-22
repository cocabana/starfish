# starfish

Starfish is a Alephium Hackathon Project.

A DID registry smart contract is used to manage and present identities in Web3.

## Objectives
	• Port ethr-did-registry to Ralph.
	• Create a CLI for blockchain interaction
	• Register identity owner
	• Lookup identity owner
	• Setting attribute (IPFS link to web3 profile card)
	• Lookup attribute
	• Design Web3 profile card template (name, title/role, picture)
    • Publish profile card (push to IPFS, set attribute in smart contract)




## Setup Environment

### start docker
```bash
cd docker
docker-compose up -d
```

### shutdown docker
```bash
cd docker
docker-compose down
```

### compile and deploy smart contracts
```bash
yarn compile
yarn deploy
```

### run smart contract tests
```bash
yarn test
```

## Dapp for blockchain interaction
```bash
cd packages/starfish-cli
yarn start
```