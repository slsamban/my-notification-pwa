import SongDB from "../../js/game-db.js";

const songDB = new SongDB();

document.getElementById('add-song-button').addEventListener('click', addSong);
function addSong(){
    //console.log("Add button clicked!")

    const title = document.getElementById('song-title').value;
    const artist = document.getElementById('artist-name').value;
    const likes = 0;

    songDB.add(title,artist,likes);

    document.getElementById('song-title').value = '';
    document.getElementById('artist-name').value = ''
}