package com.grupo9.digitalbooking.controller;

import com.grupo9.digitalbooking.model.Category;
import com.grupo9.digitalbooking.model.City;
import com.grupo9.digitalbooking.model.Image;
import com.grupo9.digitalbooking.model.Product;
import com.grupo9.digitalbooking.response.ApiResponseHandler;
import com.grupo9.digitalbooking.services.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Api(tags="Products")
@CrossOrigin (origins = "*")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService prodctService;

    @GetMapping
    public ResponseEntity<?> listarProductos(){
        return prodctService.listarProductos();
    }

    @ApiOperation(value="Product by ID", notes="Product by ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarProducto(@PathVariable Integer id)  {
        return prodctService.buscarProducto(id);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> searchProductByCategory(@PathVariable Category id) {
        return prodctService.searchProductByCategory(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> crearProducto(@RequestBody Product product){
        return prodctService.crearProducto(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> editarProducto(@PathVariable Integer id, @RequestBody Product product) {
        return prodctService.editarProducto(id, product);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Integer id){
        return prodctService.eliminarProducto(id);
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<?> searchProductByCategory(@PathVariable City id) {
        return prodctService.searchProductByCity(id);
    }

    @GetMapping("/dates/{startDate}/{endDate}")
    public ResponseEntity<?> searchProductsByRangeDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return prodctService.searchProductsByRangeDate(startDate, endDate);
    }

    @GetMapping("/cityAndDates/{cityId}/{startDate}/{endDate}")
    public ResponseEntity<?> searchProductsByRangeDate(@PathVariable Integer cityId, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return prodctService.searchProductsByCityAndRangeDate(cityId, startDate, endDate);
    }

    @GetMapping("findAll/random")
    public ResponseEntity<?> findAllRandom(){
        return prodctService.findAllRandom();
    }

    @PostMapping(value = "/create-with-images", consumes = {"multipart/form-data"})
    public ResponseEntity<Product> crearProductoConImagenes(
            @RequestPart("product") Product product,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        // Este método ya no es necesario, ya que ahora las imágenes se suben desde el frontend y solo se reciben las URLs.
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null);
    }

    @PostMapping("/create-with-image-urls")
    public ResponseEntity<Product> crearProductoConImageUrls(
            @RequestBody Product product,
            @RequestParam(value = "imageUrls", required = false) List<String> imageUrls) {
        // Validar cantidad de imágenes
        if (imageUrls != null && imageUrls.size() > 5) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        // Guardar producto primero
        Product savedProduct = prodctService.saveProduct(product);
        // Ya no se asocian imágenes subidas a S3 desde el backend
        return ResponseEntity.ok(savedProduct);
    }
}
