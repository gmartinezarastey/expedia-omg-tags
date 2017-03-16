if (typeof b.utagPageName != "undefined" && b.utagPageName.toLowerCase().indexOf('checkout.confirmation'.toLowerCase()) > -1) {
  dataLayer_airnz = [];  
  dataLayer_airnz.push({
        'event': 'trackEventEcommerce', //This event name triggers corresponding tag in GTM and it has to be directly under dataLayer
        'eventDetails.category': 'ecommerce',
        'eventDetails.action': 'purchase',
        'paymentStatus': 'confirmed', //dimension 48
        'paymentMethod': 'visa', //dimension 49
        'ecommerce': {
            'currencyCode': b['currencyCode'], //String the storefront currency
            'purchase': {
                'actionField': { //no revenue field to be set
                    'id': b['checkoutTRL'], //String replace with the actual transaction ID
                    'affiliation': b['siteName'], //The actual storefront in which booking is made
                    'tax': b['taxes'] //total tax for the transaction
                },
                'products': [{
                    'id': b['domain'], //string - id of the product
                    'name': b['hotelName'], //string - name of the product - use propertytype?
                    'price': b['checkout.cartTotal.amount'], //float - should be in storefront currency value
                    'brand': b['SiteBrand'], //string
                    'category': 'ancillary/hotels/' + b['starRating'] + '/' +  b['hotelType'], //string - set the levels of category separated by "/" - first level "Ancillary", next level "hotels", then <star rating>, followed by <property type> (if available)
                    'variant': 'hotels', //string
                    'quantity': b['numberOfRooms'], //integer - number of rooms booked
                    'dimension35': b['lengthOfStay'], //integer - trip duration
                    'dimension33': b['checkInDate'], //string - check in date
                    'dimension37': b['bookingWindow'], //integer - lead days assuming purchase was made on 16 jan 2017
                    'dimension38': b['numberOfGuests'], //integer - total number of guests in booking
                    'dimension53': b['entity.checkout.hotel.hotelRegion'], //string - region of destination
                    'dimension57': 'indirect', //string - a type
                    'dimension93': 'hotels', //string - ancillary sub type
                }]
            }
        }
    });
}