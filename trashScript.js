window.onload = function() {
    // Get the array from localStorage, had to JSON.parse bc it was an array of JSON objects
    let trashValue = JSON.parse(localStorage.getItem('accessTrash'));
    // console.log(trashValue);
    deletedBooks = trashValue;
    showTrashCards();
};

function showTrashCards() {
    // console.log("showTrashCards called");
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    //Now accesses my trashData.js file which has the books array of objects! Yay!
    for (let i = 0; i < deletedBooks.length; i++) {
        let title = deletedBooks[i].title;
        //~~~~~~~~~~~~~~~~~~~~~~Might be a good idea to use mapping function here~~~~~~~~~~~~~~~~~
        let imageURL = deletedBooks[i].image;
        let author = deletedBooks[i].author;
        let pages = deletedBooks[i].pages;
        let rating = deletedBooks[i].rating;
        let yearOfPub = deletedBooks[i].yearOfPub;
        let genres = deletedBooks[i].genre;
        // console.log("GENRES: " + genres);
        let link = deletedBooks[i].url;

        const nextCard = templateCard.cloneNode(true); // Copy the template card
        let tempID = "bookNum" + i.toString();
        nextCard?.setAttribute("id", tempID); //Add id with number to edit styles during filtering functions
        editTrashCardContent(nextCard, title, imageURL, author, pages, rating, yearOfPub, genres, link); // Edit title, image, author, pages, rating, yoP, genres
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editTrashCardContent(card, newTitle, newImageURL, newAuthor, newPages, newRating, newYearOfPub, newGenres, newLink) {
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
    // console.log(newGenres);
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
document.addEventListener("DOMContentLoaded", showTrashCards);


//see Quote from book
function seeQuote(thisButton){
    // console.log(thisButton);
    if(thisButton.innerText == "See Quote"){
        // console.log("User wants to SEE Quote.")
        thisButton.innerText = "Hide Quote";
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
        // alert(books[i].quote + "\n  From the book: " + books[i].title); //Original idea for quote
        // console.log(thisButton.parentNode.parentNode.childNodes[13]); //changed to 15 because of added lines/comment even
        ownAlert = thisButton.parentNode.parentNode.childNodes[15];
        // console.log(ownAlert);
        ownAlert.childNodes[5].innerText = books[i].quote;
        ownAlert.style.display = "inline-block";
    } else{
        // console.log("User wants to HIDE Quote.")
        thisButton.innerText = "See Quote";
        ownAlert = thisButton.parentNode.parentNode.childNodes[15];
        ownAlert.style.display = "none";
    }
    
}

function recoverABook(thisButton){
    let cardContainer = thisButton.parentNode.parentNode;
    let titleText =  cardContainer.childNodes[1].innerText;
    let i = 0;
    for(i; i < books.length; i++){
        console.log(books[i].title);
        if(books[i].title == titleText){
            break;
        }
    }
    if(confirm("Are you sure you want to recover this book from the site?")){
        recoverBook(i);
        deletedBooks.splice(i, 1);
        localStorage.setItem('accessTrash', JSON.stringify(deletedBooks));
        showTrashCards();
    }
}
function recoverBook(bookIndex){
    // console.log(books[bookIndex]);
    books.push(deletedBooks[bookIndex]);
    localStorage.setItem('accessRecovered', JSON.stringify(books));
    // window.location.href ='trash.html';
}