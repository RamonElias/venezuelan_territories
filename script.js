$('.btn').on('click', function(event){
	var entities = $(this).attr('name');
	$.ajax({
	    method: 'GET',
	    url: 'https://raw.githubusercontent.com/RamonElias/venezuelan_territories/gh-pages/' +
	    		entities + '.json',
	    //url: 'https://raw.githubusercontent.com/
	    //RamonElias/repotest/gh-pages/'+ entities + '.json?callback=?',
	    datatype: 'jsonp',
	    success: function(response){
			$('.places').empty();
			var entitie = entities;
			if ( entitie == 'ciudades' ) {
				entitie = entitie.slice(0, -2);
			} else {
				entitie = entitie.slice(0, -1);
			}
			var iso_3166_2 = '';
			var capital = '';
			var estado_id = '';
			var municipio_id = '';
			var places = [];
			places.push('<h1 class="text-uppercase" align="center">' +
                			entities + ' de Venezuela</h1>');
            $.each( JSON.parse( response ), function (key ,info) {
				if ( info['iso_3166-2'] ) {
            		iso_3166_2 = '<span class="label label-info">' +
            			'<strong>' + info['iso_3166-2'] + '</strong></span>';
				}
            	if ( info['capital'] ) {
            		capital = '<span class="label label-info">' +
            			'<strong>capital</strong></span>';
				}
				if ( info['estado_id'] ) {
            		estado_id = ' estado_id="' + info['estado_id'] + '"';
				}
				if ( info['municipio_id'] ) {
            		municipio_id = ' municipio_id="' + info['municipio_id'] + '"';
				}
				places.push('<div class="alert alert-info" align="center" id="' + 
            	info['id'] + '">' + //info[rentitie] + 
				'<button type="button" ' +
            	'class="place-info btn btn-default" ' +
            	'data-toggle="tooltip" ' +
            	'data-placement="top" ' +
            	'entitie="'+ entitie +'" ' +
            	'entities="'+ entities +'" ' +
            	'name="'+ entities +'" ' +
            	'title="click + info del lugar" id="' +
            	info['id'] + '"' + estado_id + municipio_id +
            	'>' + info[entitie] + '</button>' +
            	capital + iso_3166_2 + '</div>');
            	iso_3166_2 = '';
				capital = '';
            });
    		$(places.join('')).appendTo('.places');
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        console.log(JSON.stringify(jqXHR));
	        console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
	    }
    });	
	event.preventDefault();
});

$( 'body' ).on( 'click', '.place-info', function(event) {
    var place = $(this).text();
    var id = $(this).attr('id');
    var estado_id = $(this).attr('estado_id');
    var municipio_id = $(this).attr('municipio_id');
    var entitie = $(this).attr('entitie');
    var entities = $(this).attr('entities');
    var output = '';

    if (entitie == 'estado') {
    	ciudades = myjsondatabasefunc(id, '_', entitie, 'ciudades');
    	municipios = myjsondatabasefunc(id, '_', entitie, 'municipios');

        output = '<div class="row"><div class="col-md-1"></div>' +
        			'<div class="col-md-10">' +
        			'<h1 align="center" class="text-uppercase">' +
					'Ciudades y municipios del estado <mark>'+ place +
        			'</mark></h1></div><div class="col-md-1"></div></div>' +
        			'</br><div class="row"><div class="col-md-6">' +
        			ciudades + '</div><div class="col-md-6">' +
        			municipios + '</div></div>';
		$('.places').empty();
		$('.places').append(output);

    } else if (entitie == 'ciudad') {
    	var estados = myjsondatabasefunc(estado_id, '', '', 'estados');

    	output = '<div class="row"><div class="col-md-1"></div>' +
    				'<div class="col-md-10"><h1 align="center" class="text-uppercase">' +
    				'La ciudad de <mark>' + place +
        			' </mark>pertenece al estado</h1></div>' +
        			'<div class="col-md-1"></div></div></br>' +
        			'<div class="row"><div class=".col-md-6 .col-md-offset-3">' +
        			estados + '</div></div>';
		$('.places').empty();
		$('.places').append(output);

    } else if (entitie == 'municipio') {
    	var estados = myjsondatabasefunc(estado_id, '', '', 'estados');
    	var parroquias = myjsondatabasefunc(id, '_', entitie, 'parroquias');

    	output = '<div class="row"><div class="col-md-1"></div>' +
			    	'<div class="col-md-10"><h1 class="text-center text-uppercase">' +
			    	'El municipio <mark>' + place +
        			' </mark>pertenece al estado de la izquierda' +
        			' y sus parroquias se listan en la columna derecha</h1></br>' +
        			'</div><div class="col-md-1"></div><div class="row">' +
        			'<div class="col-md-6">' +
        			estados + '</div><div class="col-md-6">' +
        			parroquias + '</div></div>';
				
		$('.places').empty();
		$('.places').append(output);

    } else {
    	var municipios = myjsondatabasefunc(municipio_id, '', '', 'municipios');

    	output = '<div class="row"><div class="col-md-1"></div>' +
    				'<div class="col-md-10"><h1 align="center" class="text-uppercase">' +
    				'La parroquia <mark>' + place +
    				' </mark>pertenece al municipio</h1></div><div class="col-md-1">' +
        			'</div></div></br>' +
            		'<div class="row"><div class=".col-md-6 .col-md-offset-3">' +
            		municipios + '</div></div>';
			
		$('.places').empty();
		$('.places').append(output);
    }
	event.preventDefault();
});

function myjsondatabasefunc(id, slug, ent, ents) {
	var places = [];
    $.ajax({
	    method: 'GET',
	    url: 'raw.githubusercontent.com/RamonElias/venezuelan_territories/gh-pages/' +
	    		ents + '.json',
		datatype: 'json',
		async: false,
	    success: function(response){
	        var entitie = ents;
			if ( entitie == 'ciudades' ) {
				entitie = entitie.slice(0, -2);
			} else {
				entitie = entitie.slice(0, -1);
			}
			var iso_3166_2 = '';
			var capital = '';
			var estado_id = '';
			var municipio_id = '';
            $.each( JSON.parse( response ), function (key ,info) {
            	if ( info[ent+slug+'id'] == id )
            	{
					if ( info['iso_3166-2'] ) {
	            		iso_3166_2 = '<span class="label label-info">' +
	            			'<strong>' + info['iso_3166-2'] + '</strong></span>';
					}
	            	if ( info['capital'] ) {
	            		capital = '<span class="label label-info">' +
	            			'<strong>capital</strong></span>';
					}
					if ( info['estado_id'] ) {
	            		estado_id = ' estado_id="' + info['estado_id'] + '"';
					}
					if ( info['municipio_id'] ) {
	            		municipio_id = ' municipio_id="' + info['municipio_id'] + '"';
					}
					places.push('<div class="alert alert-info" align="center" id="' + 
                	info['id'] + '">' +
					'<button type="button" ' +
                	'class="place-info btn btn-default" ' +
                	'data-toggle="tooltip" ' +
                	'data-placement="top" ' +
                	'entitie="'+ entitie +'" ' +
                	'entities="'+ ents +'" ' +
                	'name="'+ ents +'" ' +
                	'title="click + info del lugar" id="' +
                	info['id'] + '"' + estado_id + municipio_id +
                	'>' + info[entitie] + '</button>' +
                	capital + iso_3166_2 + '</div>');
                	iso_3166_2 = '';
					capital = '';
            	}
            });
			places = places.join('');
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        console.log(JSON.stringify(jqXHR));
	        console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
	    },
    });
	return places;
}
