let body = document.querySelector('body');
body.addEventListener('click', function() {
    body.classList.toggle('menu-hidden');
    console.log('Menu Hidden: ' + body.classList.contains('menu-hidden'));
}, false);

let pictures = [{ name: "Eyes",      src: "img/eyes.png"},
                { name: "Meow",      src: "img/meow.png"},
                { name: "Rocky",     src: "img/rocky.png"},
                { name: "Sit",       src: "img/sit.png"},
                { name: "Waterfall", src: "img/waterfall.png"}]; // console.log(pictures);

var reformattedPictures = pictures.map(function(pic){
    for(var i = 0; i < pictures.length; i++) {
        var rPic = {};
        rPic = pic.name;
        return rPic;
    }
}); // console.log(reformattedPictures);

let generatedFeedHTML = reformattedPictures.map ( i => '<li><a href="#" data-id="' + i + '">' + i + '</a></li>');
let feed_list = document.querySelector('.feed-list');
feed_list.innerHTML = generatedFeedHTML.join('');





//for(var i = 0; i < pictures.length; i++) {
//    var current_picture = pictures[i];
//    console.log(i + pictures[i]);
//    listing.textContent = current_picture;
//    console.log(generatedFeedHTML);
//    feed_list.appendChild(listing);
//}
