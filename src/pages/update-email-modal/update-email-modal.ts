import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';



@IonicPage()
@Component({
  selector: 'page-update-email-modal',
  templateUrl: 'update-email-modal.html',
})
export class UpdateEmailModalPage {

  email;
  email_re;
  constructor(public navCtrl: NavController, public navParams: NavParams , private viewCtrl : ViewController, private authservice:AuthProvider,
    public toastCtrl :ToastController) {
  }

  ionViewDidLoad() {
    
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }


  updateEmail(){
    if(this.email != this.email_re){
      let toast = this.toastCtrl.create({
        message: "Emails doesn't match, Please type again new email.",
        duration: 3500,
        position: 'botttom'
       });
     toast.present();
    }else{
      this.authservice.updateEmail(this.email).then(()=>{

    }).catch(err=>{
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3500,
        position: 'botttom'
       });
       toast.present();
    })
    }
  }

}
