$('.modalDialog').hide();

$('.slide').on('click', 'h3', function(){

	$('.modalDialog').slideDown();
	$('.modalDialog div').html("<br><br><b>༼ つ ͠° ͟ ͟ʖ ͡° ༽つ Author not famous enough for wiki article. Click anywhere to close modal.</b>");
	var searchWord = $(this).text();
	console.log(searchWord);
	
	var query = "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+searchWord+"&callback=?";
		
	$.ajax({
		type: "GET",
		url: query,
		contentType: "json; charset=utf-8",
		async: false,
		dataType: "json",
		success: function (data) {
			getWiki(data);
		}
	});
	
});

function getWiki(data){
	
	var wikitext = $(".modalDialog div").html("<h2 class='title'>About the author</h2>"+data.parse.text['*']);
		
	$(wikitext).find('p'); //etsitään tekstisisältö wikipediasta, eli p-tagit
		
	$(wikitext).find('a').each(function() {	//poistetaan kaikki linkit, koska ne eivät tässä API:ssa toimi.
		$(this).replaceWith($(this).html()); 
	});
		
	$(wikitext).find('sup').remove(); //poistetaan referenssit
		
	$(wikitext).find('.mw-ext-cite-error').remove(); //poistetaan sitaattimerkinnät
	$(".modalDialog div").html($(wikitext).find('p, h2'));
			
}

$('.modalDialog').click(function(){
	$(this).slideUp();
});