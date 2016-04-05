function getBooks(){

	$('li').remove();
	
	var searchWord = $('.field').val();
	var query = "https://www.googleapis.com/books/v1/volumes?q="+searchWord+"&maxResults=27";
	
	$.ajax({
		url: query,
		async: true,
		dataType: "jsonp",
		success: function (result) {
			console.log(result);
			ajax.parseJSONP(result);
		}
	});
	
	$('#container').delay(100).fadeOut(500, function(){
		$(this).remove();
	});
	$('.deck-container').delay(600).fadeIn();
	$('header').delay(1000).fadeIn();
	$('#footer, #left, #right').delay(5000).fadeIn(500);
	
}

var ajax = {

	parseJSONP : function(result) {
		
		var sections = $('.slide');
		var perSection = Math.ceil(result.items.length / sections.length); // 27 / 3 = 9
			
		$.each(result.items, function(i, row) {
		
			var secNo = Math.floor(i / perSection); // section nr:0 on välillä 0..8, nr:1 välillä 9..17, nr:2 välillä 18..26
				
			function anim(){
			
				$('.slide:eq("' + secNo + '")').append
				(
				'<li><table class="books"><tr><td>' +
				'<a href="' + row.volumeInfo.canonicalVolumeLink + '" target="_blank">' +
				'<img src='+ row.volumeInfo.imageLinks.smallThumbnail +'/></a></td><td>' +
				'<a href="#openModal"><h3>' + row.volumeInfo.authors[0] + '</h3></a>' +
				'<h1>' + row.volumeInfo.title + '</h1>' +
				'</td><tr></table></li>'
				);
				
				$('li').each(function(index) {
					$(this).delay(250*index).animate({
						opacity: 1
					});
				});
			}
			setTimeout(anim, 800);
			
		});
		
	}
	
};