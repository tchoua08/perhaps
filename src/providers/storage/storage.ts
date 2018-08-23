
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()
export class StorageProvider {

  constructor(private storage:Storage) {
   
  }

  storeCredentials(credentials){
    this.storage.set('perhaps_credentials',credentials);
  }

  getCredentials(){
    this.storage.get('perhaps_credentials');
  }

  deleteCredentials(){
    this.storage.remove('perhaps_credentials');
  }




}
