'use strict';

var app = angular.module('dream',  ['ngResource']);

var appContext = "../" ;

	
app.controller('costomerCtl', function($scope,$resource) {
	
    // var CustomerService = $resource( appContext + 'customer/:id' );

	var CustomerService =  $resource(appContext + 'customer/:id', {id:'@_id'},{
		update: {
		  method: 'PUT'
		}
	});
	
	var customer = CustomerService.get({ id: 1 }, function() {
		$scope.customer = customer;
		console.log(customer);
    });
	
	
	var customers = CustomerService.query(function() {
		$scope.customers = customers;
		console.log(customers);
    }); 
	
 
	$scope.save = function( ) {
		$scope.customer.id = null;
		console.log( JSON.stringify($scope.customer) );
		
		CustomerService.save({}, $scope.customer, function success(response) {
			console.log("Customer saved:" + JSON.stringify(response));
			
		}, function error(errorResponse) {
			alert("Connot connect to server.");
			console.log("Error:" + JSON.stringify(errorResponse));
		});
	};
	
	$scope.update = function( customerid ) {
		console.log( JSON.stringify(customerid ) );
		CustomerService.update({id:customerid}, $scope.customer, function success(response) {
			console.log("Customer updated:" + JSON.stringify(customerid));

		}, function error(errorResponse) {
			alert("Connot connect to server.");
			console.log("Error:" + JSON.stringify(errorResponse));
		});
	};
	
	
 
	 
	$scope.remove = function( customerid ) {
		console.log( JSON.stringify(customerid ) );
		alert("You are going to remove :" + customerid);
		CustomerService.remove({id:customerid}, {}, function success(response) {
			console.log("Customer removed:" + JSON.stringify(customerid));

		}, function error(errorResponse) {
			alert("Connot connect to server.");
			console.log("Error:" + JSON.stringify(errorResponse));
		});
	};
});





