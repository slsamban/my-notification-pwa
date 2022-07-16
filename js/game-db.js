// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";


export default class SongDB {
    constructor() {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCCOlCmslE-oaXaI3ZE5kuAqIvpBNQSmqY",
            authDomain: "mypwa-c05b6.firebaseapp.com",
            projectId: "mypwa-c05b6",
            storageBucket: "mypwa-c05b6.appspot.com",
            messagingSenderId: "746052522601",
            appId: "1:746052522601:web:6f62fd49cfe4a4f7a9c8f8"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }

    add(title, artist, likes) {
        console.log('Title: ', title);
        console.log('Artist: ', artist);
        console.log('Likes: ', likes);

        if(title ==='') {
            alert('Title should be entered!');
        } else if(artist===''){
            alert('Artist should be entered!');
        } else {
            const dbCollection = collection(this.db, "songs");
        return addDoc(dbCollection, {
            title: title,
            artist: artist,
            likes: likes
        });
        }
    }

    getAll() {
        return new Promise((resolve, reject) => {
            getDocs(collection(this.db, "songs"))
            .then((querySnapshot) => {
                const results = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log(doc.id, data);
                    results.push({
                        id: doc.id,
                        title: data.title,
                        artist: data.artist,
                        likes: data.likes
                    });
                });
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            });
        });
        
    }

    update(song, updatedLikes) {
        return new Promise((resolve, reject) => {
            const dbDoc = doc(this.db, "songs", song.id);
            updateDoc(dbDoc, {
                likes: updatedLikes
            })
            .then(() => {
                song.likes = updatedLikes;
                resolve(song);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    delete(song) {
        const dbDoc = doc(this.db, "songs", song.id);
        return deleteDoc(dbDoc);
    }

}