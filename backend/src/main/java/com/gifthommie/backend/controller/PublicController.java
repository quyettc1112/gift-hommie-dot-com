package com.gifthommie.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.entity.Product;
import com.gifthommie.backend.exception.NotFoundException;
import com.gifthommie.backend.service.ProductService;

@RestController
@RequestMapping("/public/product")
public class PublicController {
	@Autowired
	ProductService productService;
	
	// Get all product and Pageable
	//http://localhost:8080/public/product
	@GetMapping
	public APIPageableResponseDTO<Product> getProductList(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize
			) {
		return productService.getPageableProducts(pageNo, pageSize);
	}
	
	
	//Search: Get Product By Name 
	// How to view product search by name
	// http://localhost:8080/public/product/name?search=A
	@GetMapping("/name")
	public APIPageableResponseDTO<Product> getProductByName(
			@RequestParam(defaultValue = "0", name = "page") Integer pageNo,
			@RequestParam(defaultValue = "12", name = "size") Integer pageSize,
			@RequestParam(defaultValue = "", name = "search") String search
			) {
		return productService.searchProductsByName(pageNo, pageSize, search);
	}
	
	//View Product Detail: get product by id
	//http://localhost:8080/public/product/6
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable int productId) {
		if(productService.checkExist(productId) == false) {
			throw new NotFoundException("Product not found!!!");
		}
		return productService.getProductById(productId);
	}
	
}
