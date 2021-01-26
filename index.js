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
                                <h5 class="card-title"><a href="${element.url}" target="_blank">${element.title}</a></h5>
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

function fda() {
	$('#main').html('')
	$.ajax({
		type: 'GET',
		url:
			'https://api.fda.gov/drug/event.json?api_key=VwV6GVBKrGlTQQ1cI7CdFwzgKRwttF4hHdRz5HpX&search=' +
			$('#search').val(),
		success: function (response) {
			console.log(response)
			let result = response.results
			result.forEach((element) => {
				let product = []
				let products = ''
				element.patient.drug.forEach((element) => {
					// product.push(element.medicinalproduct)
					products += `<li>${element.medicinalproduct}</li>`
				})
				$('#main').append(`
			        <div class="col-12 col-md-6 col-lg-4">
			            <div class="card mx-auto" style="width: 18rem;">
			                <div class="card-body">
			                    <h5 class="card-title">${element.companynumb}</h5>
                                <p class="card-text">
                                    <ul>
                                        <li>${element.patient.reaction[0].reactionmeddrapt}</li>
                                        <li>${element.patient.reaction[0].reactionmeddraversionpt}</li>
                                        <li>${element.patient.reaction[0].reactionoutcome}</li>
                                    </ul>
                                    
			                    </p>
                                <p class="card-text">
									<h5>Medicinal Product</h5>
									<ul>
										${products}
									
									</ul>
			                    </p>
			                </div>
			            </div>
			        </div>
                `)
			})
		},
	})
}

function recipe() {
	$('#main').html('')
	$.ajax({
		type: 'GET',
		url:
			'https://api.spoonacular.com/recipes/complexSearch?apiKey=4d9617e0d6714615a45b3af75282afb5&query=' +
			$('#recipe').val(),
		success: function (response) {
			console.log(response)
			let result = response.results
			result.forEach((element) => {
				$('#main').append(`
			        <div class="col-12 col-md-6 col-lg-4">
                        <div class="card mx-auto" style="width: 18rem;">
                            <img src="${element.image}" class="card-img-top" alt="...">
			                <div class="card-body">
			                    <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${element.id}" >${element.title}</h5>
			                </div>
			            </div>
			        </div>
                `)
			})
		},
	})
}

$('#exampleModal').on('show.bs.modal', function (e) {
	let id = e.relatedTarget.dataset.id
	console.log(id)
	$.ajax({
		type: 'GET',
		url:
			'https://api.spoonacular.com/recipes/' +
			id +
			'/information?apiKey=4d9617e0d6714615a45b3af75282afb5',
		success: function (response) {
			console.log(response)
			// append to modal body
		},
	})
})

function calculate() {
	$('#main').html('')
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url:
			'https://love-calculator.p.rapidapi.com/getPercentage?fname=' +
			$('#fname').val() +
			'&sname=' +
			$('#sname').val(),
		headers: {
			'x-rapidapi-key':
				'7706e67daamshd0dcb0ca98b24a5p1e8f37jsnc502c427dce4',
			'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
		},
		success: function (response) {
			console.log(response)
			$()
			$('#main').append(`
				<div class="col-12">
					<div class="card mx-auto" style="width: 18rem;">
						<div class="card-body">
							<p class="display-4">${response.percentage}%</p>
							<h5 class="card-title">${response.result}</h5>
							<p>first name: ${response.fname}</p>
							<p>second name: ${response.sname}</p>
						</div>
					</div>
				</div>
			`)
		},
	})
}

function elaine(news) {
	$('#main').html('')
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url:
			'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/' +
			news +
			'/0',
		headers: {
			'x-rapidapi-key':
				'7c4795c74dmsh0cf76371648c0b8p12fba6jsn22d42653ab49',
			'x-rapidapi-host':
				'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
			useQueryString: true,
		},
		success: function (response) {
			console.log(response)
			let result = response.news
			result.forEach((element) => {
				$('#main').append(`
			        <div class="col-12 col-md-6 col-lg-4">
                        <div class="card mx-auto" style="width: 18rem;">
			                <div class="card-body">
			                    <h5 class="card-title"><a href="${element.link}" target="_blank">${element.title}</a></h5>
			                    <h5 class="card-text">${element.content}</h5>
			                </div>
			            </div>
			        </div>
                `)
			})
		},
	})
}

$('#btnSearch').on('click', function () {
	fda()
})

$('#btnRecipe').on('click', function () {
	recipe()
})

$('#btnCalculate').on('click', function () {
	calculate()
})

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
		case 'vaccine':
			elaine('get-vaccine-news')
			break
		case 'health':
			elaine('get-health-news')
			break

		default:
			break
	}
})
