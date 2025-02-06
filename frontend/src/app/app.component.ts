import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MessageService} from "primeng/api";
import {ToastService} from "./core/services/toast.service";
import {ToastModule} from "primeng/toast";
import {Button} from "primeng/button";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,Button, RouterOutlet, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit  {
  title = 'Iris Flower Prediction';


  toastService = inject(ToastService);
  messageService = inject(MessageService);


  ngOnInit() {
    this.listenToastService();
  }






  /**
   * Subscribes to the toast service to listen for incoming toast messages.
   * When a new message is received (and it's not the initial state), the message service adds it to the UI to notify the user.
   */
  private listenToastService() {
    this.toastService.sendSub.subscribe({
      next: newMessage => {
        if(newMessage && newMessage.summary !== this.toastService.INIT_STATE) {
          this.messageService.add(newMessage);
        }
      }
    })
  }
}
