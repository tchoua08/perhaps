import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Events } from 'ionic-angular';

import moment from 'moment';

@Injectable()
export class EventsProvider {
  firedata = firebase.database().ref('/Events');
  firefollow = firebase.database().ref('/Follows');
  
  constructor(public events:Events) {
   
  }


	getAllEvents() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

    getEventByType(type){
			var promise = new Promise((resolve, reject) => {
     this.firedata.orderByChild("type").equalTo(type).once("value", (snapshot) =>{
			let eventdata = snapshot.val();
			let temparr = [];
			for (var key in eventdata) {
				temparr.push(eventdata[key]);
      }
      console.log(temparr);
			resolve(temparr.reverse());
     })
		})
			
			return promise;
    }
    

    getEventById(id){
   
      var promise = new Promise((resolve, reject) => {
        this.firedata.child(id).once('value', (snapshot) => {
         resolve(snapshot.val());
      
        }).catch((err) => {
          reject(err);
          })
        })
        return promise;
    }



    getFollowingEvents(){
      
      var promise = new Promise((resolve, reject) => {
        let eventIds =[];
        let ret =[];
        this.firefollow.child(firebase.auth().currentUser.uid).orderByChild('event_id').once('value', (snapshot) => {
          let userdata = snapshot.val();
      
          for(var key in userdata){
            eventIds.push(userdata[key].event_id);
          }

          eventIds.reverse();

        }).then (()=>{
           for(var key in eventIds){
              this.getEventById(eventIds[key]).then((res:object)=>{
                 if(res ==null){  //Event doesn't exist any more
                   this.unfollow(eventIds[key]) //Unfollows Event
                 }else{
                   ret.push(res);
                 }
              })
             
           }
           resolve(ret);
        })
        


          // for (var key in userdata) {
          //   this.getEventById(userdata[key].event_id).then((res:object)=>{
          //     if(res == null){
          //       this.unfollow(userdata[key].event_id) //checks if user follows deletead Event.
          //     }else{
          //       var event = res;
                
          //       temparr.push(event);

          //     }
          //     // temparr.reverse();
          //   })
          // }


      })
    
      return promise; 
    }
    
    
    followEvent(event_id){
      var promise = new Promise((resolve, reject) => {
        this.firefollow.child(firebase.auth().currentUser.uid).child(event_id).set({
         event_id:event_id
        }).then(() => {
          this.events.publish('newfollow')
            resolve(true);
            }).catch((err) => {
              reject(err);
              alert(err);
          })
        
      })
      return promise;
    }

    unfollow(event_id){
      this.firefollow.child(firebase.auth().currentUser.uid).child(event_id).remove(); //deletes following event
    }


    checkIfFollow(event_id){
      var promise = new Promise((resolve, reject) => {
      
        this.firefollow.child(firebase.auth().currentUser.uid).child(event_id).orderByChild('event_id').once("value",snapshot => {
          if(snapshot.val() != null){
            resolve(true); 
          }else{
            resolve(false); 
          }  
        });
      })
      return promise;
    }

    setFollowingCount(event_id,following){
      console.log(following);
      this.firedata.child(event_id).update({
        following :following
      })
    }

    searchEvent(start,end){
      var promise = new Promise((resolve, reject) => { 
        this.firedata.orderByChild('title').startAt(start).endAt(end).once("value", function(snapshot) {
          let userdata = snapshot.val();
          let temparr = [];
          for (var key in userdata) {
            temparr.push(userdata[key]);
          }
          resolve(temparr);
        }).catch((err) => {
          reject(err);
        })
      });
      return promise;
    }

    getTodayEvents(){
      var promise = new Promise ((resolve,reject)=>{
        let today =moment().format("YYYY-MM-DD");
      
        this.firedata.orderByChild('startDate').startAt(today).once("value",function(snapshot){
          let events = snapshot.val();
          let temparr =[];
          for (var key in events) {
            temparr.push(events[key]);
          }
          console.log(temparr);
          resolve(temparr.reverse());

        })
     
      }).catch(err =>{
        console.log("Error getting today events");
      })
      return promise;
    }
}
