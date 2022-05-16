import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs,onSnapshot,
    addDoc, deleteDoc, doc
  } from 'firebase/firestore'

const firebaseConfig = {
    //data base credencials here deleted for privvicy reasons
  };

// variables
var swap = [] //used as a swap when fetching services

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
var colRef = collection(db, 'services')

// get collection data
//getDocs(colRef) //this one gets the services
  //.then(snapshot => { app.items = snapshot.docs.map(doc => doc.data());
     /*{
    // console.log(snapshot.docs)
    
    snapshot.docs.forEach(doc => {
      console.log("this is a loop")  
      app.items.push({ ...doc.data() })
    })*/
    //console.log(app.items)
  //})

  onSnapshot(colRef, (snapshot) => {
    app.items = snapshot.docs.map(doc => doc.data())
    console.log(app.items)
  })

  colRef = collection(db, 'reviews')
  getDocs(colRef) //this one gets the reviews
  .then(snapshot => { app.reviews = snapshot.docs.map(doc => doc.data()); /*{
    // console.log(snapshot.docs)
    
    snapshot.docs.forEach(doc => {
      console.log("this is a loop")  
      app.items.push({ ...doc.data() })
    })*/
    console.log("executing")
    console.log(app.reviews)
    colRef = collection(db, 'services')
  })

  colRef = collection(db, 'time')
  getDocs(colRef) //this one gets the reviews
  .then(snapshot => { app.clock = snapshot.docs.map(doc => doc.data()); 
    //app.clock = timeSwap.map(obj => obj.time);
    console.log("printing clock")
    //console.log(timeSwap)
    console.log(app.clock)
    colRef = collection(db, 'services')
  })

  //function used to catch erros and display them on the console pretty handy ngl
  .catch(err => {
    console.log(err.message)
  })

  // here lies vue js methods and data stored
const app = Vue.createApp({
  //here resides vue.js data declerations
    data() {
      return {
        message: 'ueHello V!', //simple string
        count: 0,
        reviews: [{review: ""}], //string array that contains reviews
        items: [{description: "", image: "", service: false}],
        display: [],
        client: {carID: "", carType: ""},
        clock: undefined,
        currenTime: "8:30",
        review: ""
      }
    },
    methods: {
      //here resides vue.js methods delerations
      reset() {
        this.count = 0;
      },
      decrase() {
          if (this.count == 0){
            this.count = this.reviews.length-1; 
          } else {
              this.count--;
          }
      },
      increase(){
        if ( this.count >= this.reviews.length-1){
          this.count = 0;
        } else {
            this.count++;
        }
      },
      getImage(imagePath) {
          return require(imagePath);
      },
      output(){
        console.log("testing if items is filled");
        this.display = this.items.map(obj => obj.service);
        console.log(this.display);
        console.log(this.client);

      },
      itemPush() {
        this.items = swap;
        console.log( this.items );
        console.log('debug text');
      },
      loadServices(){
        colRef = collection(db, 'reviews')
        getDocs(colRef) //this one gets the reviews
        .then(snapshot => { app.reviews = snapshot.docs.map(doc => doc.data()); /*{
          // console.log(snapshot.docs)
          
          snapshot.docs.forEach(doc => {
            console.log("this is a loop")  
            app.items.push({ ...doc.data() })
          })*/
          console.log("executing")
          console.log(app.reviews)
          colRef = collection(db, 'services')
        })
      },
      submit(){ //submit method used to submit the entry to the db
          const docRef = addDoc(collection(db, "clients"), {
            carID: this.client.carID,
            carType: this.client.carType,
            serviceTime: this.currenTime,
            services: this.display,
          });
          console.log("Document written");
          console.log(this.currenTime);
          alert("your request has been sent");
      },
      submitReview(){ //submit method used to submit the entry to the db
        const docRef = addDoc(collection(db, "reviews"), {
          review: this.review
        });
        console.log("Document written");
        console.log(this.review);
        colRef = collection(db, 'services')
        alert("your feedback has been sent thank you");
    }
    },
  }).mount('#app')

  //app.items.push(swap);
  //.log(app.items);

  /*for (let i = 0; i < swap.length; i++) {
    app.item.image = swap[i].image;
    console.log(app.item.image);
    app.items.push(item);
    console.log("for loop");
  }*/
  //app.output();
  
  