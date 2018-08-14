import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,LoadingController,AlertController,ToastController,App} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user'
import { ImghandlerProvider } from '../../providers/imghandler/imghandler'


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar;
  firstname;
  lastname;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl:ActionSheetController,
  public userservice:UserProvider,public loadingCtrl:LoadingController,public zone:NgZone,public alertCtrl:AlertController,
  public toastCtrl:ToastController,public imghandler:ImghandlerProvider,private app:App) {
    this.loaduserdetails();
  }

  ionViewDidLoad() {
   
  }

  cards(){
    this.navCtrl.push('CardsPage');
  }
  settings(){
    this.navCtrl.push('SettingsPage');
  }

  editProfile() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Infomation',
      buttons: [
        {
          
          text: 'Image',
			    icon: 'image',
			    cssClass: 'EditionIcon',
          handler: () => {
            this.editimage();
          }
        },
        {
          text: 'Name',
          icon: 'person',
          handler: () => {
            this.editname();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  loaduserdetails() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    this.userservice.getUser().then((res: any) => {
      this.firstname = res.firstName;
      this.lastname = res.lastName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
      loading.dismiss();
      
    })
  }

  editname(){
    let prompt = this.alertCtrl.create({
      title: 'Enter new nickname',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'First Name'
        },
        {
          name: 'lastName',
          placeholder: 'Last Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.userservice.updateDisplayName(data.firstName,data.lastName).then((res)=>{
              let toast = this.toastCtrl.create({
                message: "Your profile name updated successfully.",
                duration: 3000,
                position: 'top'
              });
              
             toast.present();
             this.loaduserdetails();
            }) .catch(err =>{
              let toast = this.toastCtrl.create({
                message: err,
                duration: 3500,
                position: 'top'
              });
             toast.present();
            })

            
         
          }
        }
      ]
    });
    prompt.present();
  }

  editimage(){
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.uploadimage().then((url: any) => {
    
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
          this.avatar = url;
        })  
        }  
      }).catch((err) => {
          statusalert.setTitle('Failed');
          statusalert.setSubTitle('Your profile pic was not changed');
          statusalert.present();
      })
      })
 }

 logout(){
  console.log('logging out...')
  this.app.getRootNav().setRoot('LoginPage');
 }

  
  

}
