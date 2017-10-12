Swagger Demo
==

Quick Start Swagger 
--
* [APP Entrance](http://localhost)
* [REST API docs](http://localhost/api/index.html)


How do I get set up? 
--

* import the required jar package in [build.gradle](https://github.com/qijunbo/swagger-demo/blob/master/build.gradle),
```
compile("com.mangofactory:swagger-springmvc:1.0.2")
```
* Copy the [SwaggerConfig.java](https://github.com/qijunbo/swagger-demo/blob/master/src/main/java/com/example/SwaggerConfig.java) in your project.


* integrate with  [Swagger UI] (https://github.com/swagger-api/swagger-ui)
In this demo,  I use [swagger-ui 2.0] (https://github.com/swagger-api/swagger-ui/tree/2.x), Copy the folder [dist](https://github.com/swagger-api/swagger-ui/tree/2.x/dist) in your project.

Then edit the index.html, and change the api url into your own url.
The url is always end with ``` api-docs ```,  adjust the application context if needed.

```
      var url = window.location.search.match(/url=([^&]+)/);
      if (url && url.length > 1) {
        url = decodeURIComponent(url[1]);
      } else {
        url = "/api-docs";
      } 
```      


* (Optional)Customize the output. you can ignore this step if you don't want to waste time on this.  That is to say, if you don't want to use ``` @ApiOperation(value = "Add Customer", httpMethod = "POST", response = Customer.class, notes = "Add Customer") ```,  swagger-ui can also works well.

```
    @RequestMapping(method = POST)
    @ApiOperation(value = "Add Customer", httpMethod = "POST", 
           response = Customer.class, notes = "Add Customer")
    public @ResponseBody Customer create(
                @ApiParam(required = true, name = "requestbody", value = "Customer data in json format.")
                @RequestBody 
                Customer customer) {
        customer = repository.save(customer);
        return customer;
    }

```    

* Build this project with gradle and run. 

```
gradlew  eclipse clean  build
java -jar  build/libs/customer.jar
```

* Done

 [http://localhost](http://localhost) 
 
 [http://localhost/api/index.html](http://localhost/api/index.html)


Who do I talk to? 
--
junboqi@foxmail.com

Reference
--
本文主要参考下面的链接, 但是由于这些参考资料用的版本比较老, 本文做了调整.

http://blog.csdn.net/wangnan9279/article/details/44541665
