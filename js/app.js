// Variables
let list = document.querySelector('.list');
let display = document.querySelector('.display');
let display_header = document.querySelector('.container-header');
let display_main = document.querySelector('main');

// Array of Objects: Cat name and Cat picture URL
let pictures = [{ name: "Eyes",      count: 0, src: "img/eyes.png"},
                { name: "Meow",      count: 0, src: "img/meow.png"},
                { name: "Rocky",     count: 0, src: "img/rocky.png"},
                { name: "Sit",       count: 0, src: "img/sit.png"},
                { name: "Waterfall", count: 0, src: "img/waterfall.png"}
               ]; // console.log(pictures);

// loop over the names in pictureNames array
for (var i = 0; i < pictures.length; i++) {

    var name = pictures[i].name;  // This is the name we're on...
    var count = pictures[i].count;
    var src = pictures[i].src;
    // creates a DOM element for the list
    var elem = document.createElement('div');
    elem.classList.add('listing');
    elem.textContent = name;

    // creates DOM elements for the display area
    var header_name = document.createElement('p');
    header_name.classList.add('name');
    var header_count = document.createElement('p');
    header_count.classList.add('count');
    var image = document.createElement('img');

    // ... and when we click...
    elem.addEventListener('click', (function(nameCopy, countCopy, srcCopy) {  // magical IIFE
        return function() { // console.log(`Name: ${nameCopy} Clicks: ${countCopy} Path: ${srcCopy}`);
            countCopy++;  // increment the count

            header_name.textContent = nameCopy;  // add cats name to header
            header_count.textContent = countCopy;  // add counts to header
            image.src = srcCopy;  // fill in source for image tag

            // clear the display area
            display_header.innerHTML = '';
            display_main.innerHTML = '';

            // build the display area
            display_header.appendChild(header_name);
            display_header.appendChild(header_count);
            display.appendChild(image);

        };

    })(name, count, src));  // arguments for the IIFE

    list.appendChild(elem); // add clickable name to list area

};  // end of for-loop
