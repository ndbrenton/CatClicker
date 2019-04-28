/* ======= MODEL ======= */      // Object: one key:value pair and one array [clickCount, name, imgSrc]
let model = {
    adminViewShowing: false,
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
    init: function() { // initialize MODEL
        model.adminViewShowing = false;
        model.currentCat = model.cats[0]; // set to first cat in list
        catListView.init(); // tells our view to initialize
        catView.init();
        adminView.init();
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    getCats: function() {
        return model.cats;
    },
    setCurrentCat: function(cat) {
        model.currentCat = cat;     // set the currently-selected cat to the object passed inspect
    },
    incrementCounter: function() {
        model.currentCat.clickCount++;  // increments the counter for the currently-selected cat
        catView.render(); // tell details to render();
    },

    openAdminView: function() { // console.log("Admin Button pressed");
        model.adminViewShowing = true;
        adminView.render();
    },
    closeAdminView: function() { // console.log("Cancel Button pressed");
        model.adminViewShowing = false;
        adminView.render();
    },
    updateCurrentCat: function() {
        console.log("Save Button pressed");
        let currentCat = octopus.getCurrentCat();

        this.adminFormName = document.getElementById('admin-form-name');
        this.adminFormUrl = document.getElementById('admin-form-url');
        this.adminFormClicks = document.getElementById('admin-form-clicks');

        currentCat.name = this.adminFormName.value;
        currentCat.imgSrc = this.adminFormUrl.value;
        currentCat.clickCount = this.adminFormClicks.value;
        catListView.render();
        catView.render();
    }
};


/* ======= VIEW ======= */
var catListView = {
    init: function() {
        this.catListElem = document.getElementById('cat-list');  // store the DOM element for easy access later
        this.render(); // render this view (update the DOM elements with the right value)
    },
    render: function() {
        var cats = octopus.getCats(); // get the cats we'll be rendering from the OCTOPUS
        this.catListElem.innerHTML = '';  // empty the cat list
        for (var i = 0; i < cats.length; i++) { // loop over the cats
            var cat = cats[i]; // this is the cat we're currently looping over
            var elem = document.createElement('li'); // make a new cat list item and set its text
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
            this.catListElem.appendChild(elem); // finally, add the element to the listing
        };
    }
};

var catView = {
    init: function() {  // store pointers to our DOM elements for easy access later
        this.catElem = document.querySelector('#cat');
        this.catNameElem = document.querySelector('#cat-name');
        this.catImageElem = document.querySelector('#cat-img');
        this.countElem = document.querySelector('#cat-count');
        this.catImageElem.addEventListener('click', function(e) { // on click,
            octopus.incrementCounter(); // increment the current's counter
        });
        this.render();  // render this view (update the DOM elements with the right value)
    },

    render: function() {  // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        if (adminViewShowing = true) {
            adminView.render();
        }
    }
};

var adminView = {
    init: function() { // store DOM pointers

        this.adminButton = document.getElementById('admin-button');
        this.adminButton.addEventListener('click', function() {
           octopus.openAdminView();
        });
        this.cancelButton = document.getElementById('cancel-button');
        this.cancelButton.addEventListener('click', function() {
           octopus.closeAdminView();
        });
        this.saveButton = document.getElementById('save-button');
        this.saveButton.addEventListener('click', function() {
            octopus.updateCurrentCat();
        });
    },
    render: function() {
        this.adminForm = document.getElementById('admin-form');
        this.adminFormName = document.getElementById('admin-form-name');
        this.adminFormUrl = document.getElementById('admin-form-url');
        this.adminFormClicks = document.getElementById('admin-form-clicks');
        let currentCat = octopus.getCurrentCat();

        if (model.adminViewShowing === true) { // console.log("Rendering Admin View...");
            this.adminForm.style.display = "block";

            // populate form fields with currently-selected cat
            this.adminFormName.value = currentCat.name;
            this.adminFormUrl.value = currentCat.imgSrc;
            this.adminFormClicks.value = currentCat.clickCount;
        } else { // console.log("Hiding Admin View...");
            this.adminForm.style.display = 'none';
        }
    }
};

octopus.init(); // make it go!
