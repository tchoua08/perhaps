import { Injectable } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import{LoadingController} from 'ionic-angular';
import { Crop } from '@ionic-native/crop'
import firebase from 'firebase/app';
import 'firebase/storage';



@Injectable()
export class ImghandlerProvider {
  nativepath:any;
  firestore = firebase.storage();
  constructor(public filechoser:FileChooser, public loadingCtrl:LoadingController, private crop:Crop) {
    
  }


  cropImage(url){
    var promise = new Promise((resolve, reject) => {
      this.crop.crop(url, {quality: 50})
      .then(
        newImage => resolve(newImage),
        error =>console.log(error)
      );
    }).catch(err =>{
     
    })
    return promise;
  }
  

//only for ANDROID

  uploadimage() {
    let loader = this.loadingCtrl.create({
      spinner:'crescent',
      content: 'Uploading image...'
     
    });
    
    var promise = new Promise((resolve, reject) => {

        this.filechoser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
              // this.nativepath = result;
              this.cropImage(result).then((res)=>{
                this.nativepath = res;
             
             
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
                      }).catch(err=>{
                        reject(err);
                      })
                    })
                  }
                })
               
              })
              })
            });
         })
      })
     return promise;   
  }

}
