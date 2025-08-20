sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/booksfiori/test/integration/FirstJourney',
		'ns/booksfiori/test/integration/pages/BooksList',
		'ns/booksfiori/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/booksfiori') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);