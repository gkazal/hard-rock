
document.getElementById('search-song').addEventListener('click',searchSong)


function searchSong(){
    const songname = document.getElementById('songName').value

    if(songname == ''){
        alert('please text something')
    }

    // clear the lyrics path
    const lyricsValue = document.getElementById('lyricsResult') 
    lyricsValue.innerHTML = ''

    // clear the songtitle path
    const songTitle = document.getElementById('songTitle') 
    songTitle.innerHTML = ''

    fetch(`https://api.lyrics.ovh/suggest/${songName.value}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)

        showResults(data)
        
    })
}



const showResults = (data) => {

    const fancySongList = document.getElementById('fancy-songList')

    
    fancySongList.innerHTML = ''

    for(let i=0; i<10; i++){
        fancySongList.innerHTML +=     `<div class="single-result row align-items-center my-3 p-3">

                                        <div class="col-md-9">
                                        <h3 class="lyrics-name">Title - <span>${data.data[i].title}</span></h3>
                                        <p class="author lead">Album by - <span>${data.data[i].album.title}</span></p>
                                        <p class="author lead">Artist - <span>${data.data[i].artist.name}</span></p>

                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                        <button onclick="showLyrics('${data.data[i].artist.name}','${data.data[i].title}','${data.data[i].album.title}')" class="btn btn-success">Get Lyrics</button>
                                        </div>
                                        </div>`
    }
}


// show lyrics function
function showLyrics(artist,title,showSongTitle){

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.lyrics){
            const lyricsValue = document.getElementById('lyricsResult') 
            lyricsValue.innerHTML = data.lyrics // display lyrics in page
        }
        else{
            const lyricsValue = document.getElementById('lyricsResult') 

            lyricsValue.innerHTML = `<h3>lyrics not found</h3>`
        }
       
        // display song title
        const songTitle = document.getElementById('songTitle') 
        songTitle.innerHTML = `<h5>Song-Title: </h5>'${showSongTitle}'`

    })
   
}



