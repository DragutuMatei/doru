import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  get,
  update,
  remove,
  onValue,
  query,
} from "firebase/database";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

class Fire {
  constructor() {
    // Initialize Firebase with your config
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
      databaseURL: process.env.REACT_APP_DATABASEURL,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
      appId: process.env.REACT_APP_APPID,
      measurementId: process.env.REACT_APP_MEASUREMENTID,
    };

    const app = initializeApp(firebaseConfig);
    this.database = getDatabase(app);
    this.googleProvider = new GoogleAuthProvider();
    this.auth = getAuth(app);
  }


  async logout() {
    await signOut(this.auth);
  }

  getuser() {
    return this.auth;
  } 

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const user = result.user;
      console.log("User logged in successfully:", user);
      return user;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  }
  
  async createData(path, data) {
    try {
      const newDataRef = push(ref(this.database, path), data);
      return newDataRef.key;
    } catch (error) {
      console.error("Error adding data: ", error);
      throw error;
    }
  }

  async getData(path) {
    try {
      const dataSnapshot = await get(ref(this.database, path));
      return dataSnapshot.val();
    } catch (error) {
      console.error("Error getting data: ", error);
      throw error;
    }
  }

  async updateData(path, newData) {
    try {
      await update(ref(this.database, path), newData);
      console.log("Data successfully updated!");
    } catch (error) {
      console.error("Error updating data: ", error);
      throw error;
    }
  }

  async deleteData(path) {
    try {
      await remove(ref(this.database, path));
      console.log("Data successfully deleted!");
    } catch (error) {
      console.error("Error deleting data: ", error);
      throw error;
    }
  }

  listenForChanges(path, callback) {
    try {
      const dataRef = ref(this.database, path);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
      });
    } catch (error) {
      console.error("Error listening for changes: ", error);
      throw error;
    }
  }
}

export default Fire;
