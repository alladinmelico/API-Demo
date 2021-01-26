function getMovies(type) {
	$('#main').html('')
	$.ajax({
		type: 'GET',
		url:
			'https://api.themoviedb.org/3/movie/' +
			type +
			'?api_key=f74ea2d2a1b56702b469bdae78d2c803&language=en-US&page=1',
		success: function (response) {
			console.log(response)
			let result = response.results

			result.forEach((movie) => {
				$('#main').append(`
                    <div class="col-12 col-md-6 col-lg-4"> 
                        <div class="card mx-auto" style="width: 18rem;">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="card-text">
                                    ${movie.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                `)
			})
		},
	})
}

function getNews(country) {
	$('#main').html('')
	$.ajax({
		type: 'GET',
		url:
			'https://newsapi.org/v2/top-headlines?country=' +
			country +
			'&apiKey=52f7931a08004a709a40356c820caff5',
		success: function (response) {
			console.log(response)
			let articles = response.articles
			articles.forEach((element) => {
				$('#main').append(`
                    <div class="col-12 col-md-6 col-lg-4"> 
                        <div class="card mx-auto" style="width: 18rem;">
                            <img src="${element.urlToImage}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">
                                    ${element.description}
                                </p>
                            </div>
                        </div>
                    </div>
                `)
			})
		},
	})
}

// request data from API
$('.nav-link').on('click', function (e) {
	console.log(e)
	let id = e.currentTarget.dataset.id
	switch (id) {
		case 'popular':
			getMovies('popular')
			break

		case 'rated':
			getMovies('top_rated')
			break

		case 'upcoming':
			getMovies('upcoming')
			break
		case 'ph':
			getNews('ph')
			break
		case 'uk':
			getNews('ca')
			break

		default:
			break
	}
})
