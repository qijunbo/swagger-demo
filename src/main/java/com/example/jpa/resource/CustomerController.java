package com.example.jpa.resource;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.jpa.repository.Customer;
import com.example.jpa.repository.CustomerRepository;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    
    @Value("${security.jwt.HS256KEY}")
    private String valueTest ;

	@Autowired
	private CustomerRepository repository;

	@RequestMapping(method = POST)
	@ApiOperation(value = "Add Customer", httpMethod = "POST", response = Customer.class, notes = "Add Customer")
	public @ResponseBody Customer create(
			@ApiParam(required = true, name = "requestbody", value = "Customer data in json format.") @RequestBody Customer customer) {
		customer = repository.save(customer);
		return customer;
	}

	/**
	 * @return all the Customers
	 */
	@RequestMapping(method = GET)
	public @ResponseBody Iterable<Customer> get() {
		return repository.findAll();
	}

	/**
	 * @param id
	 *            the identifier of the charge point
	 * @return charge point
	 */
	@RequestMapping(value = "/{id}", method = GET)
	public @ResponseBody Customer get(@PathVariable long id) {
		return repository.findOne(id);
	}

	@RequestMapping(value = "/{id}", method = DELETE)
	public @ResponseBody String delete(@PathVariable long id) {
		repository.delete(id);
		return null;
	}
	
    @RequestMapping(value = "/test", method = GET)
    public String test() {
        return valueTest;
    }

}
