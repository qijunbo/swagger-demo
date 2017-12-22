'use strict';

/* Controllers */

dreamApp.controller('costomerCtl', function($scope, $resource) {

	var CustomerService = $resource(appContext + 'api/customer/:id', {
		id : '@_id'
	}, {
		update : {
			method : 'PUT'
		}
	});


	var customers = CustomerService.query(function() {
		$scope.customers = customers;
		console.log("Initial load: ")
		console.log(customers);
	});

	
	//无用的方法
	$scope.get = function(_id) {
		CustomerService.get({
			id : _id
		}, function() {
			$scope.customer = customer;
			console.log(customer);
		});
	};
	
	$scope.reload = function() { 
		return ;
		// 这不是个好主意
		var resp =  CustomerService.query(function() {
			console.log("Reload:" + JSON.stringify(resp));
			$scope.customers = resp;
		});
	};
	
	$scope.save = function() {
		CustomerService.save({}, $scope.customer, function success(response) {
			console.log("Customer saved:" + JSON.stringify(response));
			if ($scope.editflag == "new") {
				$scope.customers.push(response);	
				$scope.customer = null;
			}
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
		$scope.editflag = "edit";
		$scope.customer = customer;
	};
	
	$scope.onNewClick = function( ) {
		$scope.customer = {"birthday":new Date()};
		$scope.editflag = "new";
		console.log("Adding customer:" + JSON.stringify($scope.customer));
	};
	

});
