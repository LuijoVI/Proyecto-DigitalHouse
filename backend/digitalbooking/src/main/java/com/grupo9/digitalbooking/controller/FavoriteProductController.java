package com.grupo9.digitalbooking.controller;

import com.grupo9.digitalbooking.model.FavoriteProduct;
import com.grupo9.digitalbooking.model.Product;
import com.grupo9.digitalbooking.model.User;
import com.grupo9.digitalbooking.repository.UserRepository;
import com.grupo9.digitalbooking.services.FavoriteProductService;
import com.grupo9.digitalbooking.services.ProductService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Api(tags = "FavoriteProducts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/favorites")
@Transactional
public class FavoriteProductController {

    private static final Logger logger = LoggerFactory.getLogger(FavoriteProductController.class);

    @Autowired
    private FavoriteProductService favoriteProductService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<FavoriteProduct>> getAll() {
        return ResponseEntity.ok(favoriteProductService.getAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<FavoriteProduct> getById(@PathVariable Integer id) {
        Optional<FavoriteProduct> fp = favoriteProductService.getById(id);
        return fp.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteProduct>> getByUser(@PathVariable Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
        }
        List<FavoriteProduct> list = favoriteProductService.getByUser(userOpt.get());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<FavoriteProduct>> getByProduct(@PathVariable Integer productId) {
        Optional<Product> productOpt = productService.getProductById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
        }
        List<FavoriteProduct> list = favoriteProductService.getByProduct(productOpt.get());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody FavoriteProduct favoriteProduct) {
        try {
            if (favoriteProduct.getUser() == null || favoriteProduct.getProduct() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User and Product must be provided");
            }
            Optional<User> userOpt = userRepository.findById(favoriteProduct.getUser().getId());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            Optional<Product> productOpt = productService.getProductById(favoriteProduct.getProduct().getId());
            if (productOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
            if (favoriteProductService.existsByUserAndProduct(userOpt.get(), productOpt.get())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Favorite already exists");
            }
            favoriteProduct.setUser(userOpt.get());
            favoriteProduct.setProduct(productOpt.get());
            FavoriteProduct saved = favoriteProductService.save(favoriteProduct);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            logger.error("Error al crear producto favorito", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<FavoriteProduct> fp = favoriteProductService.getById(id);
        if (fp.isPresent()) {
            favoriteProductService.deleteById(id);
            return ResponseEntity.ok("Favorite deleted with id: " + id);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorite not found with id: " + id);
    }
}
