import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventListPage } from './event-list';
import {ScrollHide} from '../../components/scroll-hide/scroll-hide'

@NgModule({
  declarations: [
    EventListPage,
    ScrollHide
    
 
  ],
  imports: [
    IonicPageModule.forChild(EventListPage),
  ],
})
export class EventListPageModule {}
