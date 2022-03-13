import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Web3 from "web3";

declare const window: any;


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  window: any;
  currentRoute: any;

  constructor(private route: ActivatedRoute, private router: Router) {

    window.ethereum.on('accountsChanged', (accounts: string | any[]) => {
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      if (!accounts.length) {
        // logic to handle what happens once MetaMask is locked
        location.reload()
      }
      location.reload()
    });


  }
  public getAccounts = async () => {
    try {
      return await window.ethereum.request({ method: 'eth_accounts' });
    } catch (e) {
      return [];
    }
  }

  public openMetamask = async () => {
    window.web3 = new Web3(window.ethereum);
    let addresses = await this.getAccounts();
    if (!addresses.length) {
      try {
        addresses = await window.ethereum.enable();
      } catch (e) {
        throw e;
      }
    }
    return addresses.length ? addresses[0] : null;
  };
}


