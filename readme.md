# Google Places API Demo

![screenshot](/img/places_api_demo.png)

### About

Features
- Basic google search for places
- Automatically updates results while typing
- Click on list items to focus them on the map

Implementation
- jQuery for DOM manipulation
- `lowdash.js` included to provide `_.thottle` method
- Implemented view rendering in a similar way as Backbone. (Create newView, populate view with partials, call `$itemList.remove()` and insert newView in it's place.)


##### Todo's
- Features are on the verge of gaining a lot of benefits from using a lightweight framework to make dealing with views eaiser. A port to backbone would also make dealing with the data a bit easier.
- Add location filtering for results and map displays closer to Yelp or Airbnb

Otherwise, building this was a fun exercise doing things without the formal conventions!
