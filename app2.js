/*
1. Render songs - ok
2. Scroll Top -  
3. Play / pause / seek - ok
4. CD rotate - ok
5. Next / prev - ok
6. Random - ok
7. Next / repeat when ended - ok
8. Active song- ok
9. Scroll active song into view -ok
10. Play song when click - ok
*/


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playList = $('.playlist')
const playBtn = $(".btn-toggle-play")
const cd = $('.cd')
const Cdthumb = $('.cd-thumb')
const audito = $("#audio")
const heading = $("header h2")
const player = $(".player")
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const progress = $('.progress')
const randomBtn = $(".btn-random")
const repeatBtn = $('.btn-repeat')
const app = {
    IsPlaying: false,
    IsRandom: false,
    IsRepeat: false,
    currentIndex: 0,

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
          "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
      ],
   // render ra thanh pham
    render : function() {
        const htmls = this.songs.map((song , index) =>{
            return `
            <div class="song ${this.currentIndex == index ? 'active' : ""}">
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

      playList.innerHTML = htmls.join('')
    }, 

    defineProperties : function() {
        Object.defineProperty(this , 'currentSong', {
            get : function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent : function() {
        const _this = this
        const Cdwidth = cd.offsetWidth
        // xu ly scroll Top
       
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = Cdwidth - scrollTop
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / scrollTop
        }

        // Rotate CD
        const CdRotate = Cdthumb.animate([
            {transform : 'rotate(360deg)'}

        ],
            {
                duration : 10000,
                iterations : Infinity

            }   
        )

        CdRotate.pause()

        // xu ly khi bam play
        playBtn.onclick = function() {

             if(_this.IsPlaying){
                 audio.pause()
             }else {
                 audio.play()
             }
        }

        // xu ly khi nhac nhay

        audio.onplay = function() {
            _this.IsPlaying = true
            player.classList.add('playing')
            CdRotate.play()
        }

         // xu ly khi nhac dung
        audio.onpause = function() {
            _this.IsPlaying = false
            player.classList.remove('playing')
            CdRotate.pause()
        }

        // khi bam next
        nextBtn.onclick = function() {
             _this.NextSong()
             audio.play()
             _this.render()

        }

        // khi bam prev 

        prevBtn.onclick = function() {
            _this.PrevSong()
            audio.play()
            _this.render()
        }

        // xu ly khi clik repeat

        repeatBtn.onclick = function() {
            _this.IsRepeat =! _this.IsRepeat
            repeatBtn.classList.toggle('active' , _this.IsRepeat)
           
        }

        // xu ly khi click random

        randomBtn.onclick = function() {
            _this.IsRandom =! _this.IsRandom
            randomBtn.classList.toggle('active', _this.IsRandom)
        }

        // xu ly khi tien do bai hat thay doi

        audio.ontimeupdate  = function() {
           if(audio.duration){
               const progressPercent = Math.floor(audio.currentTime / audio.duration * 100) 
               progress.value = progressPercent
           }
        }
     
        //xu ly khi tua

        progress.onchange = function(e) {
            const seektime = audio.duration / 100 *e.target.value 
            audio.currentTime = seektime
        }

        // xu ly khi ket thuc bai hat

        audio.onended = function() {
            if(_this.IsRepeat){
                audio.play()
            }else{
                nextBtn.onclick()
            }
        }
        
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        Cdthumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

    },

    NextSong : function() {
          this.currentIndex++
          if(this.currentIndex >= this.songs.length){
              this.currentIndex = 0 
          }
        this.loadCurrentSong()  
    },

    PrevSong : function() {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    start : function() {
        // render ra san pham
        this.render()

        // xu ly cac su kien
        this.handleEvent()

        // xu ly thuoc tinh 
        this.defineProperties()

        // tai lai bai hat hien tai

        this.loadCurrentSong()
    }
}

app.start()