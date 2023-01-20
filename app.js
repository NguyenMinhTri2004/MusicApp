/*
1. Render songs - ok
2. Scroll Top -  ok
3. Play / pause / seek - ok
4. CD rotate - ok
5. Next / prev - ok
6. Random - ok
7. Next / repeat when ended - ok
8. Active song- ok
9. Scroll active song into view -ok
10. Play song when click - ok
*/




const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'TRI_PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const app = {

    currentIndex : 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
      {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
      },
      {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
      },
      {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
          "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
      },
      {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
      },
      {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
      },
      {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:
          "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
      },
      {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
        image:
          "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
      }
    ],

    setConfig : function(key, value) {
          this.config[key] = value;
           localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    render : function() {
      const htmls = this.songs.map((song , index) => {
        return `
        <div class="song ${index == this.currentIndex ? "active" : " "}" data-index = ${index} >
        <div class="thumb" style="background-image: url(${song.image})">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
        `
      })

      playlist.innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this , 'currentSong', {
            get : function() {
                return this.songs[this.currentIndex]
            }
        }) 
    },

    hanldeEvents : function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        // xu ly CD quay / dung
     
          const cdThumbAnimate =  cdThumb.animate([
              {transform: 'rotate(360deg)'}
          ],{
              duration: 10000,
              iterations: Infinity,
          })

          cdThumbAnimate.pause()

        // xu ly phong to thu nho
        document.onscroll = function() {
          const scrollTop = window.scrollY||document.documentElement.scrollTop
          const newWidth = cdWidth - scrollTop
          cd.style.width = newWidth
          cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
          const opacity = newWidth / scrollTop
          cd.style.opacity = opacity 
        }
        // xu ly khi click play
         playBtn.onclick = function() {
             if(_this.isPlaying){
                
                 audio.pause()
             }else {
                 audio.play()
             }
            
         }

            //   khi song duoc play

          audio.onplay = function() {
              _this.isPlaying = true
              player.classList.add('playing')
              cdThumbAnimate.play()
          }

        //   khi song bi pause

          audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
          }

        //   khi tien do bai hat thay doi

           audio.ontimeupdate = function() {
               if(audio.duration){
                   const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                   progress.value = progressPercent
               }
           }


        //    xu ly khi tua song

       

        progress.onchange = function(e) {
          const seekTime = audio.duration / 100 *e.target.value
          audio.currentTime = seekTime
        }

        // khi next bai hat 
        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // khi prev bai hat 

        prevBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            }else {
                _this.prevSong()
            }    
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // khi random bai hat 

         randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
             randomBtn.classList.toggle('active', _this.isRandom)
            
         }

        //  phat lai 1 bai hat 

        repeatBtn.onclick = function() {
          _this.isRepeat = !_this.isRepeat
          _this.setConfig('isRepeat', _this.isRepeat)
          repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // xu ly next song khi end

        audio.onended = function () {
         
          if(_this.isRepeat) {
             audio.play();
          }else {
             nextBtn.click();
          }
        }


        // lang nghe click vao playlist

        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active')
            //  xu khi khi click vao playlist
             if(songNode || e.target.closest('.option')) {
               
                  if(songNode) {
                      _this.currentIndex = Number(songNode.dataset.index)
                      _this.loadCurrentSong()
                      audio.play()
                      _this.render()
                  }

                }
             }
        },
      
    

    scrollToActiveSong: function() {
       if(this.currentIndex === 0){
         window.scrollTo(0, 0);
       };
         setTimeout(() => {
               $('.song.active').scrollIntoView( {
                   behavior : 'smooth',
                   block : 'nearest',
               })
          } , 200)
    },

    loadCurrentSong : function() {
      

       heading.textContent = this.currentSong.name
       cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
       audio.src = this.currentSong.path
    },

    loadConfig : function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong : function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }

        this.loadCurrentSong()
    },

    prevSong : function() {
        this.currentIndex--
        if(this.currentIndex <=0){
            this.currentIndex = this.songs.length - 1 
        }

        this.loadCurrentSong()
    },


    playRandomSong: function() {
        let newIndex 
         do {
             newIndex = Math.floor(Math.random() * this.songs.length)
         }while(newIndex === this.currentIndex)

         this.currentIndex = newIndex
         this.loadCurrentSong()
    },

    start : function() {

      this.loadConfig()
        // dinh nghia thuoc tinh object
       this.defineProperties()

      // lang nghe / xu ly cac su kien   
       this.hanldeEvents()

       this.loadCurrentSong()

      // render playlist   
       this.render()

      //  hien thi trang thai ban dau cua button repeat
       randomBtn.classList.toggle('active', this.isRandom)
       repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()

console.log(typeof app.songs)