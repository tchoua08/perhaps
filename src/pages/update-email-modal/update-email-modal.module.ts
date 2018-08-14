import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateEmailModalPage } from './update-email-modal';

@NgModule({
  declarations: [
    UpdateEmailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateEmailModalPage),
  ],
})
export class UpdateEmailModalPageModule {}
