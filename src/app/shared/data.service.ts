import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  private profileName = new BehaviorSubject('');
  name = this.profileName.asObservable();
  changeName(name: string) {
    this.profileName.next(name);
  }
  private profileImage = new BehaviorSubject('');
  image = this.profileImage.asObservable();
  changeImage(image: string) {
    this.profileImage.next(image);
  }
}