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


sudo -i curl -L https://github.com/docker/compose/releases/download/2.24.6/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

$ chmod +x /usr/local/bin/docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose

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