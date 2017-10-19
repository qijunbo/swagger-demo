'use strict';

/* Controllers */

dreamApp.controller('costomerCtl', function($scope, $resource) {

	// var CustomerService = $resource( appContext + 'customer/:id' );

	var CustomerService = $resource(appContext + 'api/customer/:id', {
		id : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});

	var customer = CustomerService.get({
		id : 1
	}, function() {
		$scope.customer = customer;
		console.log(customer);
	});

	var customers = CustomerService.query(function() {
		$scope.customers = customers;
		console.log(customers);
	});

	$scope.save = function() {
		$scope.customer.id = null;
		console.log(JSON.stringify($scope.customer));

		CustomerService.save({}, $scope.customer, function success(response) {
			console.log("Customer saved:" + JSON.stringify(response));
			$scope.customers.push(response);		
		}, function error(errorResponse) {
			alert("Connot connect to server.");
			console.log("Error:" + JSON.stringify(errorResponse));
		});
	};

	$scope.update = function(customerid) {
		console.log(JSON.stringify(customerid));
		CustomerService.update({
			id : customerid
		}, $scope.customer, function success(response) {
			console.log("Customer updated:" + JSON.stringify(customerid));

		}, function error(errorResponse) {
			alert("Connot connect to server.");
			console.log("Error:" + JSON.stringify(errorResponse));
		});
	};

	$scope.remove = function(customer) {
		var customerid = customer.id;
		console.log(JSON.stringify(customerid));
		alert("You are going to remove :" + customerid);
		CustomerService.remove({
			id : customerid
		}, {}, function success(response) {
			console.log("Customer removed:" + JSON.stringify(customerid));
			var index = $scope.customers.indexOf(customer);
			$scope.customers.splice(index, 1);

		}, function error(errorResponse) {
			alert("Connot connect to server.");
			console.log("Error:" + JSON.stringify(errorResponse));
		});
	};

	$scope.onEditClick = function(customer) {
		console.log("Editting customer:" + JSON.stringify(customer));
		$scope.customer = customer;
	}
	
	$scope.onNewButtonClick = function( ) {
		$scope.customer = {"id": $scope.customers.length + 1, "birthday":new Date()};
		console.log("Adding customer:" + JSON.stringify($scope.customer));
	}

});
