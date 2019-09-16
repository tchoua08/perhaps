import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Events } from 'ionic-angular';

import moment from 'moment';

@Injectable()
export class EventsProvider {
  firedata = firebase.database().ref('/Events');
  firefollow = firebase.database().ref('/Follows');
  usersRef: any = firebase.database().ref('Users');
  public tabImage:any[];
  public tabUrl:string="";

  constructor(public events:Events) {

  }

  getFiredataRef(){

    return this.firedata;

 }

 getTabImage(){

  return this.tabImage;

}

  setEvents(data:any,id:any){
  let event = {
    startDate:data.startDate,
    startTime:data.startTime,
    endDate:data.endDate,
    endTime:data.endTime,
    address:data.location,
    city:data.city,
    description:data.description,
    title:data.title,
    phone:data.phone,
    ticket_price:data.price,
    type:data.type,
    id:id
    }
    console.log("valeur de event:"+JSON.stringify(event))
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(id).update(event).then(() => {
          resolve(true);

          }).catch((err) => {
            reject(err);
        })

    })
    return promise;

  }


  updateEvents(data:any,id:any){
    let event = {
      startDate:data.startDate,
      startTime:data.startTime,
      endDate:data.endDate,
      endTime:data.endTime,
      address:data.address,
      city:data.city,
      description:data.description,
      title:data.title,
      phone:data.phone,
      ticket_price:data.ticket_price,
      type:data.type,
      id:id
      }
      console.log("valeur de event:"+JSON.stringify(event))
      var promise = new Promise((resolve, reject) => {
        this.firedata.child(id).update(event).then(() => {
            resolve(true);

            }).catch((err) => {
              reject(err);
          })

      })
      return promise;

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


    getEventById(id:any){

      var promise = new Promise((resolve, reject) => {
        console.log("valeur de id:"+id)
        this.firedata.child(id).once('value', (snapshot) => {
          console.log(JSON.stringify(snapshot.val()))
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

    updateRequest(picturearray:any,ref:any){

      let self =this;
      let taille =picturearray.length;

      if (taille ===1){

        setTimeout(() =>self.sendImageServeru0(picturearray[0],ref)  , 1000)
      }
      if (taille ===2){
        setTimeout(() =>self.sendImageServeru0(picturearray[0],ref)  , 1000)
        setTimeout(() =>self.sendImageServeru1(picturearray[1],ref)  , 3000)
      }
      if (taille===3){
        setTimeout(() =>self.sendImageServeru0(picturearray[0],ref)  , 1000)
        setTimeout(() =>self.sendImageServeru1(picturearray[1],ref)  , 3000)
        setTimeout(() =>self.sendImageServeru2(picturearray[2],ref)  , 3000)


      }


 }

     createRequest(picturearray:any,ref:any){

      let self =this;
      let taille =picturearray.length;

      if (taille ===1){

        setTimeout(() =>self.sendImageServer0(picturearray[0],ref)  , 1000)
      }
      if (taille ===2){
        setTimeout(() =>self.sendImageServer0(picturearray[0],ref)  , 1000)
        setTimeout(() =>self.sendImageServer1(picturearray[1],ref)  , 3000)
      }
      if (taille===3){
        setTimeout(() =>self.sendImageServer0(picturearray[0],ref)  , 1000)
        setTimeout(() =>self.sendImageServer1(picturearray[1],ref)  , 3000)
        setTimeout(() =>self.sendImageServer2(picturearray[2],ref)  , 3000)


      }


 }

 makeid()
 {
     var text = "";
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

     for( var i=0; i < 12; i++ )
         text += possible.charAt(Math.floor(Math.random() * possible.length));

     return text;
 }

sendImageServer0(snap:any, reference:any){

  let imageRef =firebase.storage().ref().child('Events/'+reference+'/photos/'+this.makeid()+".png")

  let item =snap.toString();

  imageRef.putString(item, firebase.storage.StringFormat.DATA_URL).then((savedPicture:any) => {

      imageRef.getDownloadURL().then((url:any) =>{

        this.firedata.child(reference).set({

          image1: url

          })

    })

 },(error:any)=>{

alert(JSON.stringify(error))
})

}

sendImageServer1(snap:any, reference:any){

  let imageRef =firebase.storage().ref().child('Events/'+reference+'/photos/'+this.makeid()+".png")

  let item =snap.toString();

  imageRef.putString(item, firebase.storage.StringFormat.DATA_URL).then((savedPicture:any) => {

      imageRef.getDownloadURL().then((url:any) =>{


        this.firedata.child(reference).update({

          image2: url

          })

    })

 },(error:any)=>{

alert(JSON.stringify(error))
})

}

sendImageServer2(snap:any, reference:any){

  let imageRef =firebase.storage().ref().child('Events/'+reference+'/photos/'+this.makeid()+".png")

  let item =snap.toString();

  imageRef.putString(item, firebase.storage.StringFormat.DATA_URL).then((savedPicture:any) => {

      imageRef.getDownloadURL().then((url:any) =>{


        this.firedata.child(reference).update({

          image3: url

          })

    })

 },(error:any)=>{

alert(JSON.stringify(error))
})

}


// update images

sendImageServeru0(snap:any, reference:any){

  let imageRef =firebase.storage().ref().child('Events/'+reference+'/photos/'+this.makeid()+".png")

  let item =snap.toString();

  imageRef.putString(item, firebase.storage.StringFormat.DATA_URL).then((savedPicture:any) => {

      imageRef.getDownloadURL().then((url:any) =>{

        this.firedata.child(reference).update({

          image1: url

          })

    })

 },(error:any)=>{

alert(JSON.stringify(error))
})

}

sendImageServeru1(snap:any, reference:any){

  let imageRef =firebase.storage().ref().child('Events/'+reference+'/photos/'+this.makeid()+".png")

  let item =snap.toString();

  imageRef.putString(item, firebase.storage.StringFormat.DATA_URL).then((savedPicture:any) => {

      imageRef.getDownloadURL().then((url:any) =>{


        this.firedata.child(reference).update({

          image2: url

          })

    })

 },(error:any)=>{

alert(JSON.stringify(error))
})

}

sendImageServeru2(snap:any, reference:any){

  let imageRef =firebase.storage().ref().child('Events/'+reference+'/photos/'+this.makeid()+".png")

  let item =snap.toString();

  imageRef.putString(item, firebase.storage.StringFormat.DATA_URL).then((savedPicture:any) => {

      imageRef.getDownloadURL().then((url:any) =>{


        this.firedata.child(reference).update({

          image3: url

          })

    })

 },(error:any)=>{

alert(JSON.stringify(error))
})

}


deleteEventData(key:any){
  this.firedata.child(key).set(null);
};



}
