Spots = new Mongo.Collection ('spots');

if (Meteor.isClient) {
	Template.body.helpers({
		spots: function () {
        	return Spots.find({}, {sort: {createdAt: -1}});
		}
	});

	Template.body.events({
		"submit": function (event) {
			var adresse = event.target.adresse.value;

			Meteor.call ('geoCoder',adresse, function (error,result) {
				var lat = result[0].latitude;
				var lon = result[0].longitude;
				Meteor.call ('getMeteo', lat, lon, function (err, res) {
					var windSpeed = res.data.currently.windSpeed * 1.609;
					var dailySpeed = res.data.daily.data.map(function(dataDay){
						return dataDay.windSpeed * 1.609;
					});

					Spots.insert({
						adresse: adresse,
						latitude: lat,
						longitude: lon,
						windSpeed: windSpeed,
						dailySpeed: dailySpeed,
						createdAt: new Date()
					});
				});

			});

			event.target.adresse.value = "";

			return false;
		}
	});

	Template.spot.events({
        "click .delete": function () {
            Spots.remove(this._id);
        }
    });


}
