//0) npm init -y
//1) install firevbase package
//2. import firebase
//3. connect to the database/intialize to database

//4. access the collection

//5. read document
//6. insert documents
//7 search and find
//8. edit/updates documents
//when looking at firebase docs make sure you are looking a proper links there are more than one
// npm commands to do in terminal:
//     -npm init -y
//     -npm install
//     -npm install firebase-admin --save //installs firebase?

const { async } = require("@firebase/util");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app"); //step 3
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// const serviceAccount = require("./credentials.json"); //step 3 put credentials inside of require( ) this connects to firebase if you run it and no errors your good

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(); //3b connects to the database(firestore)

//4. access Users collection reference also called "ref" whats in () will get read or pulled from database
const usersCollection = db.collection("users");

//5a read documents
async function readUserDocuments() {
  const snapshots = await usersCollection.get();

  //5b iterate through snapshot documents
  snapshots.forEach(function (document) {
    const documentObject = document.data(); //this data is the last thing we worked on
    console.log(documentObject); //.name pulls name from database prints kyle
  });
}
// readUserDocuments(); //we just read a document and read a collection whats in read____Documents is whats being read or pulled

//4. access Users collection reference also called "ref"//if you change whats in db.collection() whats in (), change everything that said users and replace with my_shows
const my_showsCollection = db.collection("my_shows");

//5a read documents
async function readmy_showsDocuments() {
  //leave read------documents replace space with document youre replacing

  const snapshots = await my_showsCollection.get();

  //5b iterate through snapshot documents
  snapshots.forEach(function (document) {
    const documentObject = document.data(); //this data is the last thing we worked on
    console.log(documentObject); //.name pulls name from database prints kyle
  });
}
readmy_showsDocuments(); //we just read a document and read a collection also change read____Documents on this line put what your imputting in the space, this also calls the function

// 6. Insert Documents
//lines 72-89 added to database
//this take it in and uploads it
async function registerUser(userObject) {
  //notmal function handles operations async runs things in background efficiently it runs in background then does the function
  const usersCollection = db.collection("users"); //collection reference

  //create a document
  const newUserDocument = usersCollection.doc(); // this creates a document

  await newUserDocument.set(userObject);//set() inserts a new document

  console.log(`User of document id: ${newUserDocument.id}`)
}

const newUserObject = {
  name: "peter",
  phone: 12345678,
  email: "peter@bocacode.com",
  isAnAdult: true,
};

// registerUser(newUserObject);




//search and find block below
async function updateUserFullName(name, inputEmail) {
    //collection reference
    const usersCollection = db.collection('users')

    //Finding the document with given email (using .get method) lines 104-113
    // {'email'}
//     const snapshot = await usersCollection.where('email','==', inputEmail).get()

//     snapshot.forEach(function(document) {
//         document.set
//         console.log('ahmeds doc: ' +//this is what youre pulling
//         JSON.stringify(document.data()))
//     })
// }



//step 7 & 8 
const snapshot = await usersCollection.where('email', '==',
inputEmail).get()

snapshot.forEach(function(document) {
    //this is document found
    const documentReference = document.ref
    //8. update document updates all the docs with this name in database
    // documentReference.update({'name': name})

    console.log(`Weve update document of if id: $
    {document.id} name to:${name}`)
})
}

// updateUserFullName('peter', 'peter@bocacode.com')//when you change this is will update everything with this name
