const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    let url = baseURL + '?type=track&q=' + term;
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            let i=0;
            let template = ``;

            if(data.length == 0)
            {
                template += `
                    <h3>No tracks found that match your search criteria.</h3>`;
                    i==5;
            }

            while (i<5 && i<data.length)
            {
                console.log(data[i]);
                let track=data[i];
                template += trackTemplate(track);
                i++;
            }
            document.querySelector('#tracks').innerHTML = template;
            document.querySelectorAll('.preview').forEach((preview, x) => {
                preview.onclick = function previewClick(e) {
                    e.preventDefault();
                    document.querySelector('#trackImage').innerHTML = trackTemplate(data[x]);
                    audioPlayer.setAudioFile(trackAudio(data[x]));
                    audioPlayer.play();
                };
            });
        });
};

const trackTemplate = (track) => {
    return `<section class="track-item preview" data-preview-track="${track.preview_url}">
        <img src="${track.album.image_url}">
        <i class="fas play-track fa-play" aria-hidden="true"></i>
            <div class="label">
                <h3>${track.name}</h3>
                <p>${track.artist.name}</p>
            </div>
    </section>`;
};

const trackAudio = (track) =>
{
    return `${track.preview_url}`;
};

const getAlbums = (term) => {
    let url = baseURL + '?type=album&q=' + term;
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            let i=0;
            let template = ``;

            if (data.length == 0)
            {
                template += `
                    <h3>No albums were returned.</h3>`;
                    i==data.length;
            }

            while(i < data.length)
            {
                console.log(data[i]);
                let album=data[i];
                template += `
                <section class="album-card" id="${album.id}">
                    <div>
                        <img src="${album.image_url}">
                        <h3>${album.name}</h3>
                        <div class="footer">
                            <a href="${album.spotify_url}">view on spotify</a>
                        </div>
                    </div>
                </section>`;

                i++;
            }
            document.querySelector('#albums').innerHTML = template;
        });
};

const getArtist = (term) => {
    let url = baseURL + '?type=artist&q=' + term;
    fetch(url)
        .then(response => response.json ())
        .then(data => {
            console.log(data[0]);
            const artist = data[0];
            const template = `
                <section class="artist-card" id="${artist.id}">
                    <div>
                        <img src="${artist.image_url}">
                        <h3>${artist.name}</h3>
                        <div class="footer">
                            <a href="${artist.spotify_url}" target="_blank">
                                view on spotify
                                </a>
                        </div>
                    </div>
                </section>`;
            document.querySelector('#artist').innerHTML = template;
          });
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
