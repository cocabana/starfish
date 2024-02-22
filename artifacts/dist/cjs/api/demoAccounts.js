"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoAccounts = void 0;
class DemoAccounts {
    accounts = [
        '1CSbv1Fuw6dXL3SW1NbXqVVKLWajg5VCbwd9MLVznTthF',
        '1EQvsxMSZ6JrmjJwDJjPMXqka253556LJMTyTVzAEJMez',
        '17TWYoJQxNTDNfHbMkaX48NnD4vau2mAnVRgo416wjdKb',
        '1G2P43vaQuXpdVPX4t1bxYjPFN5tvGcYfYvJ8dzJnjs9t'
    ];
    setAccounts(accounts) {
        this.accounts = accounts;
    }
    getAccounts() {
        return this.accounts;
    }
}
exports.demoAccounts = new DemoAccounts();
//# sourceMappingURL=demoAccounts.js.map