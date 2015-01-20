Meteor.methods({
	geoCoder: function (adresse) {
		var geo = new GeoCoder();
		var result = geo.geocode(adresse);
		return result;
	},

	getMeteo: function (latitude, longitude) {
		var baseUrl = 'https://api.forecast.io/forecast/1b615a59d08e268bc5e69833829f0579/';
		return Meteor.http.get(baseUrl + latitude + ',' + longitude);
	}

});