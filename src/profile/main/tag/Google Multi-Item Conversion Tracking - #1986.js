//~~tv:20067.20160615
//~~tc: Adding cachebuster and @@ placeholder support.
//~~tc: Re-structuring mapping and the assembly of the URL to simplify the template.

//tealium universal tag - utag.sender.20067 ut4.0.##UTVERSION##, Copyright ##UTYEAR## Tealium.com Inc. All Rights Reserved.
try{
  (function(id, loader) {
    var u = {"id" : id};
    utag.o[loader].sender[id] = u;

    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start encode
    u.encode = function(a, b) { b = ""; try { b = encodeURIComponent(a)}catch(e){utag.DB(e);} if (b == ""){b = escape(a);} return b } 
    // End encode

    u.ev = {"view" : 1};

    // Function to replace @@ placeholders
    u.rp = function (a, b) {
      if (typeof a !== "undefined" && a.indexOf("@@") > 0) {
        a = a.replace(/@@([^@]+)@@/g, function (m, d) {
          if (b[d]) {
            return u.encode(b[d]);
          } else {
            return "";
          }
        });
      }
      return a;
    };

    ##UTGEN##

    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {

        var c, d, e, f;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "qs_delim" : "?",
          "tag_type" : "##UTVARconfig_tagtype##",
          "base_url" : "##UTVARconfig_baseurl##",
          "secure_base_url" : "##UTVARconfig_securebaseurl##",
          "static_params" : "##UTVARconfig_staticparams##",
          "cachebust" : "##UTVARconfig_cachebust##",
          "cachevar" : "##UTVARconfig_cachevar##" || "_rnd",
          "partner_id" : "",
 		      "base_price" : ""
        };

        // Start tag-scoped extensions
        ##UTEXTEND##
        // End tag-scoped extensions

        utag.DB("send:##UTID##:EXTENSIONS");
        utag.DB(b);

        c = [];

        for (d in utag.loader.GV(u.map)) {
          if (typeof b[d] !== "undefined" && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (!u.data.hasOwnProperty(e[f])) {
                c.push(e[f] + "##kvp_delim##" + u.encode(b[d]));
              }
              u.data[e[f]] = b[d];
            }
          }
        }

        u.data.secure_base_url = u.data.secure_base_url || u.data.base_url;

        u.data.url = (location.protocol === "https:" ? u.data.secure_base_url : u.data.base_url);

        if (u.data.url.indexOf("http") !== 0 && u.data.url.indexOf("/") !== 0) {
          u.data.url = location.protocol + "//" + u.data.url;
        }

        u.data.partner_id = '1';
        u.data.base_price_value_string = b['entity.checkout.cartTotal.currency'] + Math.round(b['entity.checkout.cartTotal.netValue']);
        u.data.tax_price_value_string = b['entity.checkout.cartTotal.currency'] + Math.round(b['entity.checkout.cartTotal.taxesAndFees']);

        u.data.url +=  u.data.partner_id + "/?label=FH&guid=ON&script=0&ord=" + Math.floor((Math.random() * 10000000000000000));
        u.data.url += "&data=partner_id%3D" + u.data.partner_id + "%3B";
        if (typeof b['originAirportCode'] != 'undefined' && b['originAirportCode']) {
          u.data.url += "origin_airport%3D" + b['originAirportCode'] + "%3B";
        }
        if (typeof b['destinationAirportCode'] != 'undefined' && b['destinationAirportCode']) {
          u.data.url += "destinationAirportCode%3D" + b['destinationAirportCode'] + "%3B";
        }
        if (typeof b['entity.checkout.flightOffers.0.flight.legs.0.isoFormatDepartureTimestamp'] != 'undefined' 
          && b['entity.checkout.flightOffers.0.flight.legs.0.isoFormatDepartureTimestamp']) {
          u.data.url += "departure_date%3D" + b['entity.checkout.flightOffers.0.flight.legs.0.isoFormatDepartureTimestamp'].split('T')[0] + "%3B";
        }
        if (typeof b['entity.checkout.flightOffers.0.flight.legs.1.isoFormatDepartureTimestamp'] != 'undefined' 
          && b['entity.checkout.flightOffers.0.flight.legs.1.isoFormatDepartureTimestamp']) {
          u.data.url += "return_date%3D" + b['entity.checkout.flightOffers.0.flight.legs.1.isoFormatDepartureTimestamp'].split('T')[0] + "%3B";
        }
            
        u.data.url += "base_price_value_string%3D" + u.data.base_price_value_string + "%3B";
        u.data.url += "tax_price_value_string%3D" + u.data.tax_price_value_string + "%3B";
        
        if (typeof b['adults'] != 'undefined' && b['adults']) {
          u.data.url += "adult_count%3D" + b['adults'] + "%3B";
        }
        if (typeof b['cabinClass'] != 'undefined' && b['cabinClass']) {
          u.data.url += "cabins%3D" + b['cabinClass'].replace('|',',').replace(' ', '') + "%3B";
        }
        if (typeof b['carrierCodeandFlightNumber'] != 'undefined' && b['carrierCodeandFlightNumber']) {
          u.data.url += "flight_numbers%3D" + b['carrierCodeandFlightNumber'].replace('|',',') + "%3B";
        }
        if (typeof b['checkInDate'] != 'undefined' && b['checkInDate']) {
          u.data.url += "hotel_checkin_date%3D" + b['checkInDate'] + "%3B";
        }
        if (typeof b['roomNights'] != 'undefined' && b['roomNights']) {
          u.data.url += "hotel_num_nights%3D" + b['roomNights'] + "%3B";
        }
        if (typeof b['partner_hotel_id'] != 'undefined' && b['partner_hotel_id']) {
          u.data.url += "partner_hotel_id%3D" + b['partner_hotel_id'] + "%3B";
        }

        if (u.data.static_params) {
          c.push(u.data.static_params);
        }

        var cb_check = new RegExp("(\\" + u.data.qs_delim + "|" + u.data.qsp_delim + ")" + u.data.cachevar + "=");
        if (u.data.cachebust === "enabled" && !cb_check.test(u.data.url)) {
          c.push([u.data.cachevar, Math.random()].join(u.data.kvp_delim));
        }

        if (c.length > 0) {
          if (u.data.url.indexOf(u.data.qs_delim) < 0) {
            u.data.url += u.data.qs_delim;
          } else if (u.data.url.indexOf(u.data.qs_delim) !== (u.data.url.length -1)) {
            u.data.url += u.data.qsp_delim;
          }
        }

        u.data.url = u.rp(u.data.url, b) + c.join(u.data.qsp_delim);
        u.data.url = u.data.url.replace(/##kvp_delim##/g, u.data.kvp_delim);

        u.loader({
          "type" : u.data.tag_type,
          "src" : u.data.url,
          "loc" : "script",
          "id" : "utag_##UTID##"
        });
        
        omg.pixel.fireTagPixel({id: id, name: 'google-multi-item-conversion', label: 'Google Multi-Item Conversion', context:{ u: u, b: b }});

        utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("##UTID##", "##UTLOADERID##"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
