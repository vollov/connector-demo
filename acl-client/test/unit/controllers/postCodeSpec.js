'use strict';

describe('PostCode related controllers', function() {
	var resourceRoot = 'http://localhost:3000/public/postcode';

	var postcodes = [ {
		"_id" : "52817ab347a6cb11d9debabe",
		"postcode" : "A0A0A0",
		"latitude" : 48.56745,
		"longitude" : -54.843225,
		"city" : "Gander",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debabf",
		"postcode" : "A0A1A0",
		"latitude" : 47.007347,
		"longitude" : -52.958921,
		"city" : "Aquaforte",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac0",
		"postcode" : "A0A1B0",
		"latitude" : 47.36228,
		"longitude" : -53.293993,
		"city" : "Avondale",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac1",
		"postcode" : "A0A1C0",
		"latitude" : 47.403988,
		"longitude" : -52.79987,
		"city" : "Bay Bulls",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac2",
		"postcode" : "A0A1E0",
		"latitude" : 48.086656,
		"longitude" : -52.894291,
		"city" : "Bay De Verde",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac3",
		"postcode" : "A0A1G0",
		"latitude" : 47.571957,
		"longitude" : -53.278126,
		"city" : "Bay Roberts",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac4",
		"postcode" : "A0A1H0",
		"latitude" : 47.637424,
		"longitude" : -52.926534,
		"city" : "Bell Island Front",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac5",
		"postcode" : "A0A1J0",
		"latitude" : 47.539527,
		"longitude" : -52.722751,
		"city" : "Shea Heights",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac6",
		"postcode" : "A0A1K0",
		"latitude" : 47.520422,
		"longitude" : -53.248935,
		"city" : "Brigus",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac7",
		"postcode" : "A0A1L0",
		"latitude" : 47.82983,
		"longitude" : -53.111276,
		"city" : "Broad Cove Bdv",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac8",
		"postcode" : "A0A1M0",
		"latitude" : 47.953129,
		"longitude" : -53.043975,
		"city" : "Burnt Point Bdv",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debac9",
		"postcode" : "A0A1N0",
		"latitude" : 47.048323,
		"longitude" : -52.920575,
		"city" : "Calvert",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debaca",
		"postcode" : "A0A1P0",
		"latitude" : 47.058805,
		"longitude" : -52.890816,
		"city" : "Cape Broyle",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debacb",
		"postcode" : "A0A1R0",
		"latitude" : 47.986081,
		"longitude" : -53.039611,
		"city" : "Caplin Cove Bdv",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debacc",
		"postcode" : "A0A1S0",
		"latitude" : 46.85939,
		"longitude" : -52.970668,
		"city" : "Cappahayden",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debacd",
		"postcode" : "A0A1T0",
		"latitude" : 47.729423,
		"longitude" : -53.208935,
		"city" : "Carbonear",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debace",
		"postcode" : "A0A1V0",
		"latitude" : 47.417392,
		"longitude" : -53.143811,
		"city" : "Chapel Cove",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debacf",
		"postcode" : "A0A1W0",
		"latitude" : 47.460334,
		"longitude" : -53.295967,
		"city" : "Clarkes Beach",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad0",
		"postcode" : "A0A1X0",
		"latitude" : 47.571958,
		"longitude" : -53.278126,
		"city" : "Coleys Point South",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad1",
		"postcode" : "A0A1Y0",
		"latitude" : 47.415885,
		"longitude" : -53.292081,
		"city" : "Colliers Riverhead",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad2",
		"postcode" : "A0A1Z0",
		"latitude" : 47.427521,
		"longitude" : -53.225612,
		"city" : "Conception Harbour",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad3",
		"postcode" : "A0A2A0",
		"latitude" : 47.590404,
		"longitude" : -53.289775,
		"city" : "Country Road",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad4",
		"postcode" : "A0A2B0",
		"latitude" : 47.526681,
		"longitude" : -53.259703,
		"city" : "Cupids",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad5",
		"postcode" : "A0A2C0",
		"latitude" : 47.551287,
		"longitude" : -53.178617,
		"city" : "Cupids Crossing",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad6",
		"postcode" : "A0A2E0",
		"latitude" : 47.536843,
		"longitude" : -52.853329,
		"city" : "Paradise",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad7",
		"postcode" : "A0A2G0",
		"latitude" : 46.983293,
		"longitude" : -52.912336,
		"city" : "Fermeuse",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad8",
		"postcode" : "A0A2H0",
		"latitude" : 47.022398,
		"longitude" : -52.889707,
		"city" : "Ferryland",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debad9",
		"postcode" : "A0A2J0",
		"latitude" : 47.477232,
		"longitude" : -52.977807,
		"city" : "Foxtrap",
		"province" : "NL"
	}, {
		"_id" : "52817ab347a6cb11d9debada",
		"postcode" : "A0A2K0",
		"latitude" : 47.452082,
		"longitude" : -52.754935,
		"city" : "Goulds",
		"province" : "NL"
	}];
	
	describe('PostCodeCtrl', function() {
		var scope, ctrl, $httpBackend;
		beforeEach(module('appModule'));

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET(resourceRoot + '?d=1&f=postcode&s=200').respond(postcodes);
			scope = $rootScope.$new();
			ctrl = $controller('PostCodeCtrl', {
				$scope : scope
			});
		}));

		it('users model should have 29 PostCodes', function() {
			expect(scope.postcodes).toBeUndefined();
			$httpBackend.flush();
			expect(scope.postcodes.length).toBe(20);
			expect(scope.segments.length).toBe(29);
			expect(scope.postcodes[0].postcode).toBe('A0A0A0');
		});
	});
});