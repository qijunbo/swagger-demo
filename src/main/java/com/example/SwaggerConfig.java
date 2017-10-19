package com.example;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket api() {
		//@formatter:off
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.example.jpa.resource"))
				//.paths(PathSelectors.ant("/api/*"))
				.paths(PathSelectors.any())
				.build().apiInfo(apiInfo());
		//@formatter:on
	}

	public ApiInfo apiInfo() {
		//@formatter:off
		  return new ApiInfoBuilder()
	                .title("Customer RESTful APIs")
	                .description("Demo of Swagger RESTful APIs")
	                .termsOfServiceUrl("http://www.biztree.com/doc/terms-of-service-agreement-D174")
	                .contact(new Contact("qijunbo", "https://github.com/qijunbo", "junboqi@foxmail.com"))
	                .license("GNU GENERAL PUBLIC LICENSE")
	                .licenseUrl("https://github.com/qijunbo/swagger-demo/blob/master/LICENSE")
	                .version("1.2")
	                .build();
		//@formatter:on

	}
}
