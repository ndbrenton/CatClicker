let display = document.querySelector('.display');
let list = document.querySelector('.list');

// Array of Objects: Cat name and Cat picture URL
let pictures = [{ name: "Eyes",      count: 0, src: "img/eyes.png"},
                { name: "Meow",      count: 0, src: "img/meow.png"},
                { name: "Rocky",     count: 0, src: "img/rocky.png"},
                { name: "Sit",       count: 0, src: "img/sit.png"},
                { name: "Waterfall", count: 0, src: "img/waterfall.png"}]; // console.log(pictures);
// Array of Cat Names
let pictureNames = pictures.map(function(pic){
    for(var i = 0; i < pictures.length; i++) {
        var rPic = {};
        rPic = pic.name;
        return rPic;
    }
}); // console.log(pictureNames);


// loop over the names in pictureNames array
for (var i = 0; i < pictureNames.length; i++) {
    // This is the name we're on...
    var name = pictureNames[i];
    var src = pictures[i].src;

    // We're creating a DOM element for the name LIST
    var elem = document.createElement('div');
    elem.textContent = name; // add the name between the tags
    elem.dataset.name = name; // add data property ... for maybe useful

    // We're creating a DOM elements for the display div
    var nametop = document.createElement('p');
    // var countmid = document.createElement('p');  // TBD
    var image = document.createElement('img');


    // ... and when we click, console.log the value of `name` and `src`
    elem.addEventListener('click', (function(nameCopy, srcCopy) {
        return function() {
            console.log(`Name: ${nameCopy} Path: ${srcCopy}`);
            image.src = srcCopy;
            nametop.textContent = nameCopy;
            // build the display area
            display.innerHTML = '';
            display.appendChild(nametop);
            display.appendChild(image);

        };
    })(name, src));

    list.appendChild(elem);

};





function loadFeed(feedId, feedName, feedCount) {
    console.log(`Loaded feed ${feedId} ${feedCount} ${feedName}.`);

    document.querySelector('.name').textContent = feedName;
    document.querySelector('.count').textContent = feedCount;
    document.querySelector('.display').innerHTML = `<p id="${feedName}" class="name">${feedName}</p>
                                                 <p id="${feedCount}" class="count">${feedCount}</p>
                                                 <img src="${pictures[feedId].src}" />`;
}
