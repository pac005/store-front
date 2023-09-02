import { Component, Input, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  message: String = ""

  constructor(private storage:SessionStorageService,public dialogRef: MatDialogRef<ModalComponent>) {
    this.message = storage.retrieve('modalmessage')
   }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 600);
  }

}
