
$(function() {
// javascript fun without a framework!
// Now that I'm finished, I'd considering redoing with Backbone.js if there
//  was a need for more features.

  var $divListGroup = $();
  var $locationInput = $('input#search-term');
  var $results = $('div.results');
  var $resultsCount = $('#results-count');
  var $itemTemplate = $('a#result-template').clone()
    .removeAttr('id', 'result-template')
    .removeClass('hidden');

  var googleBrowserApiKey = 'AIzaSyC8OiqBHmfmklLjEnyGJPF6i3SCvWh7xU4'
  var mapLocation = {lat: 37.7549861, lng: -122.4344163};


//*** SETTING UP GOOGLE MAPS ***//
  var map = new google.maps.Map(document.getElementById('map'), {
    center: mapLocation,
    zoom: 10
  });
  var infowindow = new google.maps.InfoWindow();
  var googleService = new google.maps.places.PlacesService(map);
  var marker = new google.maps.Marker({
    map: map
  });

  var input = document.getElementById('search-term');
  var autocomplete = new google.maps.places.Autocomplete(input);

  var moveMarker = _.throttle(function (place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
  }, 1000);

          //*** ***//


  var renderListResults = function (results) {
    $newDivListGroup = $('<div></div>').addClass('list-group');

    for (var i = 0; i < results.length; i++) {
      var $item = $itemTemplate.clone();
      var place = results[i]
      if (i === 0) {
        moveMarker(place)
      }
      $item.data('details', place)
      $item.find('img').attr('src', place['icon'])
      $item.find('h5').text(place['name'])
      $item.find('p').text(place['formatted_address'])

      // add items to temporary container
      $newDivListGroup.append($item)
    }


    // TODO: replace this with a functional 'next page' button
    if (results.length === 20) {
      var $lastItem = $itemTemplate.clone();
      $lastItem
        .removeClass('result-item')
        .find('h5')
        .text('Pagination coming soon...')

      $lastItem.find('img').remove();
      $newDivListGroup.append($lastItem);
    }

    $resultsCount.text('Results shown: ' + results.length)
    $divListGroup.remove();  // previous elements from the dom
    $divListGroup = $newDivListGroup  // reassigns reference to view

    $results.html($divListGroup) // inserts view into DOM
  };

  var handleSearchResults = function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      renderListResults(results)
    }
  };

  // search function
  var performSearch = _.throttle(function (event) {
    var term = event.target.value
    if (term.length > 1) {
      var request = {
        query: term,
        key: googleBrowserApiKey
      };
      googleService.textSearch(request, handleSearchResults);
    } else {
      // clear search results if query is too short
      $resultsCount.text("")
      $divListGroup.remove();
    }
  }, 500);

  // callback for changing map focus on click
  var clickResult = function (event) {
    event.preventDefault();
    var place = $(this).data('details')
    moveMarker(place);
  };


  $locationInput.on('keyup', performSearch);
  $results.on('click', '.list-group-item.result-item', clickResult);


  // test and sample results
  $('input#search-term').val('dogpatch');
  setTimeout(function () {
    $('input#search-term').trigger('keyup');
    setTimeout(function() {
      $('.list-group-item').first().trigger('click');
    }, 1000);
  }, 0);

});
