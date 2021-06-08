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
  walletEdit: Wallet
  constructor(private walletService: WalletService) {
    this.wallets = []
    this.walletEdit = {
      id: 0,
      name: '',
      description: ''
    }
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

  onUpdateWallet(walletEdit: Wallet) {
    this.walletService.update(walletEdit).subscribe(
      value => this.findAll(),
      error => console.error(error)
    )
  }

  onCreateWallet(walletEdit: Wallet) {
    this.walletService.create(walletEdit).subscribe(
      value => this.findAll(),
      error => console.error(error)
    )
  }

  onOpenModal(wallet: Wallet) {
    this.walletEdit = wallet;
  }

  onDeleteWallet(walletEdit: Wallet) {
    this.walletService.delete(walletEdit).subscribe(
      value => this.findAll()
    )
  }
}
