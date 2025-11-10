package com.grupo9.digitalbooking.controller;

import com.grupo9.digitalbooking.model.Category;
import com.grupo9.digitalbooking.model.City;
import com.grupo9.digitalbooking.model.Image;
import com.grupo9.digitalbooking.model.Product;
import com.grupo9.digitalbooking.response.ApiResponseHandler;
import com.grupo9.digitalbooking.services.ProductService;
import com.grupo9.digitalbooking.services.S3Service;
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

    @Autowired
    private S3Service s3Service;

    @GetMapping
    public ResponseEntity<List<Product>> listarProductos(){
        return ResponseEntity.ok(prodctService.getAllProducts());
    }

    @ApiOperation(value="Product by ID", notes="Product by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarProducto(@PathVariable Integer id)  {
        Optional<Product> productoBuscado = prodctService.getProductById(id);
        if(productoBuscado.isPresent())
            return ApiResponseHandler.generateResponse("Product data retrieved successfully", HttpStatus.OK, productoBuscado.get());

        return ApiResponseHandler.generateResponseError("Product "+ id + " not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> searchProductByCategory(@PathVariable Category id) {
        List<Product> productsSearch = prodctService.getProductsByCategory(id);
         if(!productsSearch.isEmpty()){
            return ResponseEntity.ok(productsSearch);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Product> crearProducto(@RequestBody Product product){
        return ResponseEntity.ok(prodctService.saveProduct(product));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<?> editarProducto(@RequestBody Product product) {
        Optional<Product> productoBuscado = prodctService.getProductById(product.getId());
        if (productoBuscado.isPresent()) {
            prodctService.updateProduct(product);
            return ResponseEntity.ok("Se actualizó el producto con ID: " + product.getId());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El producto con ID: " + product.getId() + " no se encuentra");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Integer id){
        if(prodctService.getProductById(id).isPresent()){
            prodctService.deleteProductById(id);
            return ResponseEntity.ok("Se eliminó con éxito el producto con ID: " + id);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el producto con ID: " + id);
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<List<Product>> searchProductByCategory(@PathVariable City id) {
        List<Product> productsSearch = prodctService.getProductsByCity(id);
        if(!productsSearch.isEmpty()){
            return ResponseEntity.ok(productsSearch);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/dates/{startDate}/{endDate}")
    public ResponseEntity<List<Product>> searchProductsByRangeDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        List<Product> productsSearch = prodctService.getProductsByRangeDate(startDate, endDate);
        if(!productsSearch.isEmpty()){
            return ResponseEntity.ok(productsSearch);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/cityAndDates/{cityId}/{startDate}/{endDate}")
    public ResponseEntity<List<Product>> searchProductsByRangeDate(@PathVariable Integer cityId, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        List<Product> productsSearch = prodctService.getProductsByCityAndRangeDate(cityId, startDate, endDate);
        if(!productsSearch.isEmpty()){
            return ResponseEntity.ok(productsSearch);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("findAll/random")
    public ResponseEntity<List<Product>> findAllRandom(){
        return ResponseEntity.ok(prodctService.getRandomProduct());
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
        // Asociar URLs como imágenes
        if (imageUrls != null) {
            List<Image> imageEntities = new ArrayList<>();
            for (String url : imageUrls) {
                Image img = new Image();
                img.setUrl(url);
                img.setProduct(savedProduct);
                imageEntities.add(img);
            }
            prodctService.saveImages(imageEntities);
            savedProduct.setImage(imageEntities);
        }
        return ResponseEntity.ok(savedProduct);
    }
}
