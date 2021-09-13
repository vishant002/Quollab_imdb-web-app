var searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", showInfo);

async function getInfo(params) {
    try {
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=c2de8eb5&t=${params}`,
            {
                method: "GET",
            }
        );
        const response_1 = await response.json();
        console.log(response_1);
        return response_1;
    } catch (err) {
        console.error(err);
    }
}

async function showInfo() {
    var requestedMovie = document.getElementById("searchbar").value;
    console.log(requestedMovie);

    if (requestedMovie === "") {
        alert("!!! Please Enter the Movie name you want to search !!!")
        return
    }

    var info = await getInfo(requestedMovie);

    if (info.Response === "False") {
        alert("!! Sorry...Movie Not Found !!");
        location.reload();
    }

    var data = `<div id="content">
                    <div class="img">
                        <img src="${info.Poster}" alt="" id="poster">
                    </div>
                    <div class="info">
                        <p id="title">${info.Title}</p>
                        <p id="releaseyr">${info.Year}</p>
                        <p id="timeduration">${info.Runtime}</p>
                        <p id="rating"><strong>Rating : </strong>${info.Ratings[0].Value}</p>
                        <p id="genre"><strong>Genre : </strong>${info.Genre}</p>
                        <p id="plot"><strong>Plot : </strong>${info.Plot}</p>
                        <p id="stars"><strong>Stars : </strong>${info.Actors}</p>
                        <p id="director"><strong>Director : </strong>${info.Director}</p>
                        <p id="Writer"><strong>Writer : </strong>${info.Writer}</p>
                        <p id="Awards"><strong>Awards : </strong>${info.Awards}</p>
                    </div>
                </div>`
    document.getElementById("box").innerHTML = data;
}
