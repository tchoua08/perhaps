import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,App,ViewController} from 'ionic-angular';
import { PinDialog } from '@ionic-native/pin-dialog';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage';




@IonicPage()
@Component({
  selector: 'page-update-password-modal',
  templateUrl: 'update-password-modal.html',
})


export class UpdatePasswordModalPage {
  pass1;
  pass2;

  constructor(public navCtrl: NavController, public navParams: NavParams,private pinDialog: PinDialog,private authserrvice:AuthProvider,
  public toastCtrl:ToastController,private storageservice:StorageProvider,private app:App, private viewCtrl :ViewController) {
    this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK', 'Cancel']).then(
      (result: any) => {
        if (result.buttonIndex == 1) console.log('User clicked OK, value is: ', result.input1);
        else if(result.buttonIndex == 2){
          console.log('User cancelled');
          this.viewCtrl.dismiss();

        } 
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePasswordModalPage');
  }


  updatePassword(){
    if(this.pass1!=this.pass2){
      let toast = this.toastCtrl.create({
        message: "Passwords doesn't match, Please type again new password.",
        duration: 3500,
        position: 'botttom'
       });
     toast.present();
    }else{
      this.authserrvice.updatePassword(this.pass1).then((res)=>{
       
        if(res == true){
          this.storageservice.deleteCredentials();
          this.app.getRootNav().setRoot('LoginPage');
        }
      }) .catch(err =>{
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3500,
          position: 'bottom'
        });
       toast.present();
      })
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
 
}
