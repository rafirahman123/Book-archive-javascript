
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const errorDiv = document.getElementById("error");
const resultCount = document.getElementById("result-count");



searchBtn.addEventListener('click', function () {
    const searchText = searchInput.value;

    // Error handling
    if (searchText === "") {
        errorDiv.innerHTML = `<h3 class="text-white">Search field cannot be empty.</h3>;`;

        resultCount.innerHTML = '';
        bookContainer.innerHTML = '';
        return;
    }

    //   Clear the field
    bookContainer.innerHTML = '';
    searchInput.value = '';
    errorDiv.innerHTML = '';
    resultCount.innerHTML = '';


    //  Fetch Book Api
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.docs));
});

const showData = (data) => {
    // No result error handle
    if (Object.keys(data).length === 0) {
        const errordiv = document.createElement("div");
        errordiv.innerHTML = `<h6 class="text-white>NO Result Found</h6><br>`
        errorDiv.appendChild(errordiv);
    } else {
        errorDiv.innerText = "";
    }


    data.forEach((book) => {
        const div = document.createElement("div");

        div.classList.add("col");
        div.innerHTML = `

        <div class="card h-100 w-75 mx-auto">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text"> ${book.author_name ? book.author_name : ''}</p>
            <p class="card-text">${book.first_publish_year ? book.first_publish_year : ''}</p>
        </div>
        </div>
           `;

        bookContainer.appendChild(div);

    });

    // Total result count
    const serchCount = document.createElement("div");
    serchCount.innerHTML = `<h5 class ="mx-auto text-white"> ${Object.keys(data).length} result found</h5> <br>`;
    resultCount.appendChild(serchCount);

}
