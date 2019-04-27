/* ======= MODEL ======= */      // Object: one key:value pair and one array [clickCount, name, imgSrc]
let model = {
    currentCat: null,
    cats: [
        {
            clickCount: 0,
            name: "Eyes",
            imgSrc: "img/eyes.png"
        },
        {
            clickCount: 0,
            name: "Meow",
            imgSrc: "img/meow.png"
        },
        {
            clickCount: 0,
            name: "Rocky",
            imgSrc: "img/rocky.png"
        },
        {
            clickCount: 0,
            name: "Sit",
            imgSrc: "img/sit.png"
        },
        {
            clickCount: 0,
            name: "Waterfall",
            imgSrc: "img/waterfall.png"
        }
    ]
}; // console.log(model);



/* ======= OCTOPUS ======= */
var octopus = {
// initialize MODEL
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0]; // set to first cat

        // tells our view to initialize
        catListView.init(); // tell list to render();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed inspect
    setCurrentCat: function(cat) {
        model.currentCat = cat; // change current cat in model
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render(); // tell details to render();
    }
};

/* ======= VIEW ======= */
var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.querySelector('#cat');
        this.catNameElem = document.querySelector('#cat-name');
        this.catImageElem = document.querySelector('#cat-img');
        this.countElem = document.querySelector('#cat-count');

        // on click, increment the current's counter
        this.catImageElem.addEventListener('click', function(e) {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right value)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
}

var catListView = {
    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right value)
        this.render();
    },

    render: function() {
        // get the cats we'll be rendering from the OCTOPUS
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (var i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            var cat = cats[i];

            // make a new cat list item and set its text
            var elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            // of the cat variable to the click event function)
            elem.addEventListener('click', (function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the listing
            this.catListElem.appendChild(elem);
        };
    }
};

// make it go!
octopus.init();
