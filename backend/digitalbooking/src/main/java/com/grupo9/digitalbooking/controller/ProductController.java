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
        try {
            List<Product> productos = prodctService.getAllProducts();
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al listar productos", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value="Product by ID", notes="Product by ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarProducto(@PathVariable Integer id)  {
        try {
            Optional<Product> productoBuscado = prodctService.getProductById(id);
            if(productoBuscado.isPresent())
                return ApiResponseHandler.generateResponse("Producto encontrado", HttpStatus.OK, productoBuscado.get());
            return ApiResponseHandler.generateResponseError("Producto con ID "+ id + " no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> searchProductByCategory(@PathVariable Category id) {
        try {
            List<Product> productsSearch = prodctService.getProductsByCategory(id);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos para la categoría", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por categoría", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> crearProducto(@RequestBody Product product){
        try {
            if (product == null || product.getName() == null || product.getCategory() == null || product.getCity() == null) {
                return ApiResponseHandler.generateResponseError("Datos de producto incompletos", HttpStatus.BAD_REQUEST);
            }
            Product creado = prodctService.saveProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(creado);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al crear producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> editarProducto(@PathVariable Integer id, @RequestBody Product product) {
        try {
            if (product == null) {
                return ApiResponseHandler.generateResponseError("Datos de producto no enviados", HttpStatus.BAD_REQUEST);
            }
            Optional<Product> productoBuscado = prodctService.getProductById(id);
            if (productoBuscado.isPresent()) {
                product.setId(id);
                prodctService.updateProduct(product);
                return ApiResponseHandler.generateResponse("Producto actualizado", HttpStatus.OK, product);
            } else {
                return ApiResponseHandler.generateResponseError("Producto con ID: " + id + " no encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al actualizar producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Integer id){
        try {
            if(prodctService.getProductById(id).isPresent()){
                prodctService.deleteProductById(id);
                return ApiResponseHandler.generateResponse("Producto eliminado", HttpStatus.OK, null);
            }
            return ApiResponseHandler.generateResponseError("Producto con ID: " + id + " no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al eliminar producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<?> searchProductByCategory(@PathVariable City id) {
        try {
            List<Product> productsSearch = prodctService.getProductsByCity(id);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos para la ciudad", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por ciudad", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/dates/{startDate}/{endDate}")
    public ResponseEntity<?> searchProductsByRangeDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        try {
            List<Product> productsSearch = prodctService.getProductsByRangeDate(startDate, endDate);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos en el rango de fechas", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por fechas", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/cityAndDates/{cityId}/{startDate}/{endDate}")
    public ResponseEntity<?> searchProductsByRangeDate(@PathVariable Integer cityId, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        try {
            List<Product> productsSearch = prodctService.getProductsByCityAndRangeDate(cityId, startDate, endDate);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos para la ciudad y rango de fechas", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por ciudad y fechas", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("findAll/random")
    public ResponseEntity<?> findAllRandom(){
        try {
            List<Product> productos = prodctService.getRandomProduct();
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al obtener productos aleatorios", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
