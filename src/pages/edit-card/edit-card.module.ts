import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCardPage } from './edit-card';

@NgModule({
  declarations: [
    EditCardPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCardPage),
  ],
})
export class EditCardPageModule {}
