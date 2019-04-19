/* Project4: feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against feedreader.
 */

/* All suites + tests placed within IIFE (eg. $() )
 * some tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', () => { // suite named "RSS Feeds"
        /* tests that the allFeeds variable has been defined
         *  and that it is not empty
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* test loops through each feed
         * in the 'allFeeds' object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL properties which are not empty', () => {
            for( let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
                expect(feed.url).toContain('http');
                expect(feed.url).toContain('//');
            }
        });
        /* test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name properties which are not empty', () => {
            for( let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });

    describe('The menu', () => { // suite named "The menu"
        /* tests that the menu element is
         * hidden by default. It tests for class="menu-hidden"
         */
        it('is hidden by default', () => {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
        /* tests that the menu changes visibility when icon is clicked.
         */
        it('toggles visibility when clicked', () => {
            bodyElement = document.body;
            hamburgerMenu = document.querySelector('a.menu-icon-link');
            // expectation1: click will remove the class (display menu)
            hamburgerMenu.click();
            expect(bodyElement.classList.contains('menu-hidden')).not.toBe(true);
            // expectation2: clicking again will restore the class (hide menu)
            hamburgerMenu.click();
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', () => { // suite named "Initial Entries"
         // when the loadFeed() completes its work,
        beforeEach( (done) => { // Jasmine's beforeEach and asynchronous done()
            loadFeed(0, done);
        });
        // there is at least a single article.entry element within div.feed
        it('are present within feed container div', () => {
            let feedDiv = document.querySelector('div.feed');
            let feedEntry = document.querySelector('article.entry');
            expect(feedDiv.contains(feedEntry)).toBe(true);
        });
    });


    describe('New Feed Selection', () => { // suite named "New Feed Selection"
        let feed1;
        let feed2;

        beforeEach( (done) => { // asynchronous function
            loadFeed(0, () => {
                feed1 = document.querySelector('div.feed').innerHTML;
                loadFeed(1, () => { // when a new feed is loaded
                    feed2 = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });
        //  the content changes depending on which feed is selected
        it('changes content', () => {
            expect(feed1).not.toBe(feed2);
        });
    });
}());
