import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

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
			resolve(temparr);
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
        this.firefollow.child(firebase.auth().currentUser.uid).orderByChild('event_id').once('value', (snapshot) => {
          let userdata = snapshot.val();
          let temparr = [];
          for (var key in userdata) {
            this.getEventById(userdata[key].event_id).then((res:any)=>{
              temparr.push(res);
            })
          }
          resolve(temparr);
       
        }).catch((err) => {
          reject(err);
        })
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
    
      this.firefollow.child(firebase.auth().currentUser.uid).child(event_id).remove();
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
}
