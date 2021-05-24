import { Component, OnInit } from '@angular/core';
import {Wallet} from "./Wallet";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {WalletService} from "./wallet.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallets: Wallet[]
  constructor(private walletService: WalletService) {
    this.wallets = []
  }

  ngOnInit(): void {
    this.findAll()
  }

  public findAll(){
    this.walletService.findAll().subscribe(
      value => {
        this.wallets = value
        console.log(value)
      },
      error =>{
        console.error(error)
      }
    )
  }

}
