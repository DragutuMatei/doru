import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, update, remove, onValue } from 'firebase/database';

class Fire {
  constructor() {
    // Initialize Firebase with your config
    const firebaseConfig = {
      apiKey: "AIzaSyCfFM6Vaoijcm6W4XuGpB1asdkzEClsd6g",
      authDomain: "bunkerproduction-7313d.firebaseapp.com",
      databaseURL: "https://bunkerproduction-7313d-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "bunkerproduction-7313d",
      storageBucket: "bunkerproduction-7313d.appspot.com",
      messagingSenderId: "291219581303",
      appId: "1:291219581303:web:abd6d97534256664865972",
      measurementId: "G-YWXRL7XGPG"
    };

    const app = initializeApp(firebaseConfig);
    this.database = getDatabase(app);
  }

  async createData(path, data) {
    try {
      const newDataRef = push(ref(this.database, path), data);
      return newDataRef.key;
    } catch (error) {
      console.error('Error adding data: ', error);
      throw error;
    }
  }

  async getData(path) {
    try {
      const dataSnapshot = await get(ref(this.database, path));
      return dataSnapshot.val();
    } catch (error) {
      console.error('Error getting data: ', error);
      throw error;
    }
  }

  async updateData(path, newData) {
    try {
      await update(ref(this.database, path), newData);
      console.log('Data successfully updated!');
    } catch (error) {
      console.error('Error updating data: ', error);
      throw error;
    }
  }

  async deleteData(path) {
    try {
      await remove(ref(this.database, path));
      console.log('Data successfully deleted!');
    } catch (error) {
      console.error('Error deleting data: ', error);
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
      console.error('Error listening for changes: ', error);
      throw error;
    }
  }
}

export default Fire;
