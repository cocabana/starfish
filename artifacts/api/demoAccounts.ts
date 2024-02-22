

class DemoAccounts {

  private accounts = [
    '1CSbv1Fuw6dXL3SW1NbXqVVKLWajg5VCbwd9MLVznTthF',
    '1EQvsxMSZ6JrmjJwDJjPMXqka253556LJMTyTVzAEJMez',
    '17TWYoJQxNTDNfHbMkaX48NnD4vau2mAnVRgo416wjdKb',
    '1G2P43vaQuXpdVPX4t1bxYjPFN5tvGcYfYvJ8dzJnjs9t'
  ];

  setAccounts(accounts: string[]) {
    this.accounts = accounts;
  }

  getAccounts() {
    return this.accounts;
  }
}

export const demoAccounts = new DemoAccounts();


//curl -X POST -d '1CSbv1Fuw6dXL3SW1NbXqVVKLWajg5VCbwd9MLVznTthF' https://faucet.testnet.alephium.org/send