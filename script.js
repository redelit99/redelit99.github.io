// Elementi DOM
const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const jokeContainer = document.querySelector(".joke-container");
const heartLoader = document.querySelector(".cssload-main");
const loveVideo = document.getElementById("loveVideo");
const flowersWrapper = document.getElementById("flowersWrapper");
const loveMessage = document.getElementById("loveMessage");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const messages = [
  "abbiamo passato un bellissimo anno assieme",
  "e ho capito alcune cose",
  "in qualunque modo tu appaia",
  "qualunque cosa tu faccia",
  "io ti amerò",
  "perche' sei la cosa migliore che mi sia mai capitata",
  "e per me sei perfetta",
  "nessuno potra mai essere come te",
  "ti amo",
];


function showMessages() {
  const messagesWrapper = document.getElementById("messagesWrapper");
  const messageBox = document.getElementById("messageBox");
  let index = 0;

  messagesWrapper.classList.add("show");

  function showNext() {
    if (index >= messages.length) return;

    // Fade in
    messageBox.textContent = messages[index];
    messageBox.classList.add("show");

    setTimeout(() => {
      index++;

      // Se è l'ultimo messaggio, lancia i cuori e lascia il box visibile
      if (index >= messages.length) {
        spawnHearts();
        setInterval(spawnHearts, 1000);
        return;
      }

      // Fade out
      messageBox.classList.remove("show");

      setTimeout(() => {
        showNext();
      }, 1500);

    }, 3000);
  }

  showNext();
}

// Pulsante NO che scappa
noBtn.addEventListener("mouseover", () => {
  const margin = 20;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const maxX = window.innerWidth - btnW - margin;
  const maxY = window.innerHeight - btnH - margin;
  const newX = Math.floor(Math.random() * (maxX - margin)) + margin;
  const newY = Math.floor(Math.random() * (maxY - margin)) + margin;
  noBtn.style.position = "fixed";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

// Pulsante SI
function spawnHearts() {
  const count = 30;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart-particle");
      heart.textContent = "❤️";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = `-2rem`;
      heart.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
      heart.style.animationDuration = `${Math.random() * 1.5 + 1}s`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2500);
    }, Math.random() * 1000);
  }
}

yesBtn.addEventListener("click", () => {
  spawnHearts();
  questionContainer.classList.remove("active");

  setTimeout(() => {
    resultContainer.classList.add("active");
    loveVideo.play();
  }, 500);
});

loveVideo.addEventListener("ended", () => {

  // Aspetta 3 secondi sulla pagina "HA LO SAPEVO"
  setTimeout(() => {
    resultContainer.classList.remove("active");
    jokeContainer.classList.add("active");

    // Dopo 5 secondi sulla pagina "scherzo", fade out e mostra fiori
    setTimeout(() => {
      document.body.classList.add("fade-out");

      setTimeout(() => {
        questionContainer.style.display = "none";
        resultContainer.style.display = "none";
        jokeContainer.style.display = "none";
        heartLoader.style.display = "none";

        document.body.classList.remove("fade-out");
        document.body.classList.remove("not-loaded");

        flowersWrapper.classList.add("show");

        document.querySelectorAll('.flower-container').forEach(el => {
          el.innerHTML = `<div class="flower-top">
            <div class="flower-petal flower-petal__1"></div>
            <div class="flower-petal flower-petal__2"></div>
            <div class="flower-petal flower-petal__3"></div>
            <div class="flower-petal flower-petal__4"></div>
            <div class="flower-petal flower-petal__5"></div>
            <div class="flower-petal flower-petal__6"></div>
            <div class="flower-petal flower-petal__7"></div>
            <div class="flower-petal flower-petal__8"></div>
            <div class="flower-circle"></div>
            <div class="flower-light flower-light__1"></div>
            <div class="flower-light flower-light__2"></div>
            <div class="flower-light flower-light__3"></div>
            <div class="flower-light flower-light__4"></div>
            <div class="flower-light flower-light__5"></div>
            <div class="flower-light flower-light__6"></div>
            <div class="flower-light flower-light__7"></div>
            <div class="flower-light flower-light__8"></div>
            </div>
            <div class="flower-bottom">
            <div class="flower-stem"></div>
            <div class="flower-leaf flower-leaf__1"></div>
            <div class="flower-leaf flower-leaf__2"></div>
            <div class="flower-leaf flower-leaf__3"></div>
            <div class="flower-leaf flower-leaf__4"></div>
            <div class="flower-leaf flower-leaf__5"></div>
            <div class="flower-leaf flower-leaf__6"></div>
            <div class="flower-grass flower-grass__1"></div>
            <div class="flower-grass flower-grass__2"></div>
            <div class="flower-grass flower-grass__3"></div>
            <div class="flower-grass flower-grass__4"></div>
            </div>`;
        });

        const flowerEls = Array.from(document.querySelectorAll('.flower-container'));
        flowerEls[0].classList.add('animate');

        setTimeout(() => {
          for (let i = 1; i <= 2 && i < flowerEls.length; i++) {
            flowerEls[i].classList.add('animate');
          }
          let remaining = flowerEls.slice(3);
          const interval = setInterval(() => {
            if (remaining.length === 0) { clearInterval(interval); return; }
            const randomIndex = Math.floor(Math.random() * remaining.length);
            remaining.splice(randomIndex, 1)[0].classList.add('animate');
          }, 500);
        }, 3000);

        // Dopo 4 secondi mostra il messaggio
        setTimeout(() => {
          loveMessage.classList.add("show");

          // Dopo 5 secondi dal messaggio, avvia il montaggio
          setTimeout(() => {
            const slideshowWrapper = document.getElementById("slideshowWrapper");
            const slideshow = document.getElementById("slideshow");
            const music = document.getElementById("slideshowMusic");
            const slides = slideshow.querySelectorAll(".slide");
            let current = 0;

            flowersWrapper.classList.remove("show");
            slideshowWrapper.classList.add("show");
            music.play();

            const timer = setInterval(() => {
              current++;
              if (current >= slides.length) {
                clearInterval(timer);
                setTimeout(() => {
                  slideshowWrapper.classList.remove("show");
                  showMessages(); // <-- aggiungi questa
                }, 3000);
                return;
              }
              slideshow.style.transform = `translateX(-${current * 100}%)`;
            }, 5000);

          }, 10000);

        }, 4000);

      }, 1500);
    }, 5000); // tempo sulla pagina "scherzo"

  }, 5000); // tempo sulla pagina "HA LO SAPEVO" dopo il video
});

// Fallback per il video (nel caso l'evento ended non partisse)
setTimeout(() => {
  if (resultContainer.classList.contains("active") && loveVideo) {
    let checkInterval = setInterval(() => {
      if (loveVideo.ended) {
        console.log("Fallback: video finito");
        clearInterval(checkInterval);
        loveVideo.dispatchEvent(new Event('ended'));
      }
    }, 500);
  }
}, 5000);
