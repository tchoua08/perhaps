import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePasswordModalPage } from './update-password-modal';

@NgModule({
  declarations: [
    UpdatePasswordModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePasswordModalPage),
  ],
})
export class UpdatePasswordModalPageModule {}
