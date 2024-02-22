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

### Install dependencies
```bash
yarn install
```

### Start docker
```bash
cd docker
docker-compose up -d
```

### Deploy smart contracts
```bash
yarn deploy
```

### Build smart contract artifacts for use in DAPPS
```bash
yarn workspace @starfish/artifacts build
```

## Run demo
### Demo-CLI
Command line prompts for blockchain interaction
```bash
cd packages/demo-cli
yarn start
```

### Demo-Website

```bash
cd packages/demo-website
yarn dev
```

## Cleanup Envioronment
### shutdown docker
```bash
cd docker
docker-compose down
```