import { Injectable } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import{LoadingController} from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImghandlerProvider {
  nativepath:any;
  firestore = firebase.storage();
  constructor(public filechoser:FileChooser, public loadingCtrl:LoadingController) {
    
  }


  uploadimage() {
    let loader = this.loadingCtrl.create({
      spinner:'crescent',
      content: 'Uploading image...'
     
    });
    
    var promise = new Promise((resolve, reject) => {
      
        this.filechoser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                  loader.present();
                  imageStore.put(imgBlob).then((res) => {
                    
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                      
                      resolve(url);
                      loader.dismiss();
                    }).catch((err) => {
                        
                      reject(err);
                    })
                  }).catch((err) => {
                
                    reject(err);
                  })
                }
              })
             
            })
            

          })
      })
    })  


  
     return promise;   
  }

}
