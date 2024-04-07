/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */

// This function adds cards the page to display the data in the array
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    //Now accesses my data.js file which has the books array of objects! Yay!
    for (let i = 0; i < books.length; i++) {
        let title = books[i].title;
        //~~~~~~~~~~~~~~~~~~~~~~Might be a good idea to use mapping function here~~~~~~~~~~~~~~~~~
        let imageURL = books[i].image;
        let author = books[i].author;
        let pages = books[i].pages;
        let rating = books[i].rating;
        let yearOfPub = books[i].yearOfPub;
        let genres = books[i].genre;
        let link = books[i].url;

        const nextCard = templateCard.cloneNode(true); // Copy the template card
        let tempID = "bookNum" + i.toString();
        nextCard?.setAttribute("id", tempID); //Add id with number to edit styles during filtering functions
        editCardContent(nextCard, title, imageURL, author, pages, rating, yearOfPub, genres, link); // Edit title, image, author, pages, rating, yoP, genres
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, newTitle, newImageURL, newAuthor, newPages, newRating, newYearOfPub, newGenres, newLink) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardAuthor = card.querySelector("h3");
    cardAuthor.textContent = newAuthor;

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";
    const cardLink = card.querySelector(".imgLink");
    cardLink.href = newLink;

    // console.log("new card:", newTitle, "- html: ", card);

    //Creating a list item to add page number
    const cardPages = card.querySelector("ul");
    const listElement = document.createElement("LI");
    const liText = document.createTextNode(newPages + " pages");
    listElement.appendChild(liText);
    cardPages.appendChild(listElement);
    //List will include year of publication
    const listElement2 = document.createElement("LI");
    const liText2 = document.createTextNode("Year of Publication: " + newYearOfPub);
    listElement2.appendChild(liText2);
    cardPages.appendChild(listElement2);
    //List will include genres
    const listElement3 = document.createElement("LI");
    let genreText = "";
    for(let i = 0; i < newGenres.length; i++){
        if(newGenres.length == 1){
            genreText = genreText + newGenres[i];
            break;
        }
        if(i == newGenres.length - 1){
            genreText = genreText + "and "
        }
        genreText = genreText + newGenres[i];
        if(i != newGenres.length-1){
            genreText = genreText + ", ";
        } 
    }
    const liText3 = document.createTextNode(genreText);
    listElement3.appendChild(liText3);
    cardPages.appendChild(listElement3);

    //Adding rating to card
    const cardRating = card.querySelector("p");
    let starRating = "";
    for(let i = 0; i < newRating; i++){
        starRating = starRating + "⭐";
    }
    cardRating.textContent = starRating;
    //Descriptor of rating
    const ratingParagraph = document.createElement("p");
    const textNode = document.createTextNode(newRating + " Stars");
    ratingParagraph.append(textNode);
    ratingParagraph.style.color="gray";
    ratingParagraph.style.fontStyle="italic";
    cardRating.appendChild(ratingParagraph);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
    // console.log("Quote Alert Button Clicked!")
    // let x = Math.random()*10 + Math.random()*4; // first attempt for random number between 0 and 14, but let's make it dynamic [researched]
    let min = 0;
    let max = books.length - 1;
    let x = Math.floor(Math.random() * (max - min + 1) + min); 
    // console.log(x);
    alert(books[x].quote + "\n  From the book: " + books[x].title);
}

function removeLastCard() {
    books.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~   MY NEW FUNCTIONS START HERE   ~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function addCard(){
    event.preventDefault(); //prevents the refreshing of page- used in a previous project of mine
    newBook = [];
    newTitle = document.getElementById("title").value;
        newBook["title"] = newTitle;
    // titles.push(newTitle);
    newAuthor = document.getElementById("author").value;
        newBook["author"] = newAuthor;
    newYearOfPub = document.getElementById("yearOfPub").value;
        newBook["yearOfPub"] = newYearOfPub;
    newPages = document.getElementById("pages").value;
        newBook["pages"] = newPages;
    //Genres are put into an array. Using checkbox, I need to check if each one is checked or not
    newGenresArr = [];
    for(let i = 1; i < 8; i++){
        // console.log("In Genres Array for loop!")
        let checkID = "genre" + i.toString();
        // console.log(checkID);
        if(document.getElementById(checkID).checked){
            // console.log(checkID + " was Checked!!");
            newGenresArr.push(document.getElementById(checkID).value);
        }
    }
        newBook["genre"] = newGenresArr;
    newRating = document.getElementById("rating").value;
        newBook["rating"] = newRating;
    newURL = document.getElementById("url").value;
        newBook["url"] = newURL;
    // urlArray.push(newURL);
    newImage = document.getElementById("image").value;
        newBook["image"] = newImage;
    newQuote = document.getElementById("quote").value;
        newBook["quote"] = newQuote;
    // console.log(newBook);
    books.push(newBook);
    showCards();
}

//Sorting Dropdown for cleaner look
function sortCategoryCheck(){
    let userSelect = document.getElementById("sortSelect").value;
    if(userSelect == "titleAZ"){
        sortByTitleAZ();
    } else if(userSelect == "authorAZ"){
        sortByAuthorAZ();
    } else if(userSelect == "pagesLH"){
        sortByPagesLH();
    } else if(userSelect == "yearOfPubLH"){
        sortByYearLH();
    } else if(userSelect == "ratingLH"){
        sortByRatingLH();
    } else if(userSelect == "titleZA"){
        sortByTitleZA();
    } else if(userSelect == "authorZA"){
        sortByAuthorZA();
    } else if(userSelect == "pagesHL"){
        sortByPagesHL();
    } else if(userSelect == "yearOfPubHL"){
        sortByYearHL();
    } else if(userSelect == "ratingHL"){
        sortByRatingHL();
    }
}

//Creating sorting functions by for Number values first (thank you Stack Overflow for number sorting help!)
function sortByPagesLH() {
    // console.log("In the function sortByPages()!");
    // document.getElementById("sortPagesHL").style.display = "inline-block";
    // document.getElementById("sortPagesLH").style.display = "none";
    books.sort(function(a, b){
        // console.log("a: " + a);
        // console.log("b: " + b);
        return a.pages - b.pages;
    });
    showCards();
}
function sortByPagesHL() {
    books.sort(function(a, b){
        return b.pages - a.pages;
    });
    showCards();
}
function sortByYearLH() {
    books.sort(function(a, b){
        return a.yearOfPub - b.yearOfPub;
    });
    showCards();
}
function sortByYearHL() {
    books.sort(function(a, b){
        return b.yearOfPub - a.yearOfPub;
    });
    showCards();
}
function sortByRatingLH() {
    books.sort(function(a, b){
        return a.rating - b.rating;
    });
    showCards();
}
function sortByRatingHL() {
    books.sort(function(a, b){
        return b.rating - a.rating;
    });
    showCards();
}

//Creating sorting functions by for Author and Title
function sortByAuthorAZ(){
    books.sort(function(a, b){
        // console.log("a: " + a.author);
        // console.log("b: " + b.author);
        // console.log(a.author - b.author);
        if(a.author < b.author){
            return -1;
        } else if(a.author > b.author){
            return 1;
        } else{
            return 0;
        }
    });
    showCards();
}
function sortByAuthorZA(){
    books.sort(function(a, b){
        if(a.author < b.author){
            return 1;
        } else if(a.author > b.author){
            return -1;
        } else{
            return 0;
        }
    });
    showCards();
}

function sortByTitleAZ(){
    books.sort(function(a, b){
        if(a.title < b.title){
            return -1;
        } else if(a.title > b.title){
            return 1;
        } else{
            return 0;
        }
    });
    showCards();
}
function sortByTitleZA(){
    books.sort(function(a, b){
        if(a.title < b.title){
            return 1;
        } else if(a.title > b.title){
            return -1;
        } else{
            return 0;
        }
    });
    showCards();
}

//Filtering Functions
function filterCategoryCheck(){
    // console.log("genreCheck() called!");
    let userSelect = document.getElementById("filterSelect").value;
    if(userSelect == "genre"){
        document.getElementById("genre").style.display = "inline-block";
        document.getElementById("filter").style.display = "none";
    } else{
        document.getElementById("genre").style.display = "none";
        document.getElementById("filter").style.display = "inline-block";
    }
}
function filterFunction(){
    let searchResults = 0;
    for(let i = 0; i < books.length; i++){
        bookDiv = document.getElementById("bookNum" + i.toString());
        bookDiv.style.display = "flex";
    }
    let userSelect = document.getElementById("filterSelect").value;
    // console.log(userSelect);
    // console.log(userInput);
    if(userSelect == "title"){
        let userInput = document.getElementById("filter").value;
        userInput = userInput.toLowerCase();    
        for(let i = 0; i < books.length; i++){
            let lowerData = books[i].title.toLowerCase();
            // console.log(lowerData);
            if(!lowerData.match(userInput)){
                bookDiv = document.getElementById("bookNum" + i.toString());
                // console.log(bookDiv);
                bookDiv.style.display = "none";
            } else{
                searchResults++;
            }
        }
    } else if (userSelect == "author"){
        let userInput = document.getElementById("filter").value;
        userInput = userInput.toLowerCase();    
        for(let i = 0; i < books.length; i++){
            let lowerData = books[i].author.toLowerCase();
            if(!lowerData.match(userInput)){
                bookDiv = document.getElementById("bookNum" + i.toString());
                bookDiv.style.display = "none";
            } else{
                searchResults++;
            }
        }
    } else if(userSelect == "genre"){
        let userInput = document.getElementById("genre").value;
        userInput = userInput.toLowerCase();    
        for(let i = 0; i < books.length; i++){
            let genreArrSize = books[i].genre.length;
            let checkMatch = false;
            for(let j = 0; j < genreArrSize; j++){
                let lowerData = books[i].genre[j].toLowerCase();
                if(lowerData.match(userInput)){
                    checkMatch = true;
                    break;
                }
            }
            if(!checkMatch){
                bookDiv = document.getElementById("bookNum" + i.toString());
                bookDiv.style.display = "none";
            } else{
                searchResults++;
            }
        }
    }
    const resultsDiv = document.querySelector(".searchResults");
    resultsDiv.style.display = "inline-block";
    const resultsNumber = document.getElementById("resultsNumber");
    resultsNumber.innerText = searchResults;
}
// If user hits Enter, the filter function will happen
let filterInput = document.getElementById("filter");
filterInput.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        filterFunction();
    }
});
// Brings back all cards to the screen
function filterResetFunction(){
    for(let i = 0; i < books.length; i++){
        bookDiv = document.getElementById("bookNum" + i.toString());
        bookDiv.style.display = "flex";
    }
    resultsDiv = document.querySelector(".searchResults");
    resultsDiv.style.display = "none";
}

//see Quote from book
function seeQuote(thisButton){
    // console.log(thisButton);
    let cardContainer = thisButton.parentNode.parentNode;
    let titleText =  cardContainer.childNodes[1].innerText;
    // console.log(titleText);
    let i = 0;
    for(i; i < books.length; i++){
        // console.log(books[i].title);
        if(books[i].title == titleText){
            break;
        }
    }
    // alert(books[i].quote + "\n  From the book: " + books[i].title);
    // console.log(thisButton.parentNode.parentNode.childNodes[13]);
    ownAlert = thisButton.parentNode.parentNode.childNodes[15];
    // console.log(ownAlert);
    ownAlert.childNodes[5].innerText = books[i].quote;
    ownAlert.style.display = "inline-block";
}

//Delete a card from list
function removeACard(thisButton){
    let cardContainer = thisButton.parentNode.parentNode;
    console.log(cardContainer);
    let titleText =  cardContainer.childNodes[1].innerText;
    // console.log(titleText);
    let i = 0;
    for(i; i < books.length; i++){
        // console.log(books[i].title);
        if(books[i].title == titleText){
            break;
        }
    }
    //tried to use delete at first but since I have an array, splice works
    books.splice(i, 1);
    showCards();
}