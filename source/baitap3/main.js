const $ = document.querySelector.bind(document);
const screen = $('.screen img');
const start = $('.action .start');
const end = $('.action .stop');

const imgList = ['img1.jfif', 'img2.jfif', 'img3.jfif', 'img4.jpg', 'img5.jpg', 'img6.jfif', 'img7.jpg', 'img8.jfif', 'img9.jfif', 'img10.jpg'];
let slide = undefined;
let index = undefined;

start.onclick = () => {
    if (!slide) {
        slide = setInterval(() => {
        let randomNumber = randomMethod();
        do {
            if (randomNumber === index) {
                randomNumber = randomMethod();
            } else {
                break;
            }
        } while(true)
        index = randomNumber;
        screen.src = './images/' + imgList[randomNumber];
        }, 1000);
    }
};

end.onclick = () => {
    clearInterval(slide);
    slide = undefined;
}

function randomMethod() {
    return Math.floor(Math.random() * imgList.length);
}