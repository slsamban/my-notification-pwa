import SongDB from "../../js/game-db.js";

const songDB = new SongDB();

songDB.getAll()
    .then((results) => {
        console.log('Results:', results);
        results.forEach((result) => {
            appendSong(result);
        });
    })
    .catch((errorMessage) => {
        console.log('Catch:', errorMessage);
    });

function appendSong(song){
    console.log(song);
    const output = document.getElementById('output');

    const elementSong = document.createElement('div');
    elementSong.className = 'song-item';
    output.append(elementSong);

    elementSong.innerHTML =`
    <h3>${song.title}</h3>
    <span class="span">${song.artist}</span>
    <span class="h4">Likes :</span>
    <span class="h5">${song.likes}</span>
    `;

    const elementRemove = document.createElement('button');
    elementSong.append(elementRemove);
    elementRemove.innerText = 'Remove';
    elementRemove.addEventListener('click', () => {
        songDB.delete(song)
            .then(() => {
                elementSong.remove();
            })
            .catch((errorMessage) => {
                console.log('Delete error:', errorMessage);
            });
    });

    const elementLikes = document.createElement('button');
    elementSong.append(elementLikes);
    elementLikes.innerText = '+1 Likes';
    elementLikes.addEventListener('click', () => {
        songDB.update(song, song.likes + 1)
        .then(() => {
            //elementSong.remove();
            //appendSong(song);
            location.reload();
        })
        .catch((errorMessage) => {
            console.log('Update error:', errorMessage);
        });
    });
    
}