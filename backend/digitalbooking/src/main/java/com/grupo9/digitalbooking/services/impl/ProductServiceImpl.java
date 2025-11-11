package com.grupo9.digitalbooking.services.impl;
import com.grupo9.digitalbooking.model.Category;
import com.grupo9.digitalbooking.model.City;
import com.grupo9.digitalbooking.model.Product;
import com.grupo9.digitalbooking.repository.ImageRepository;
import com.grupo9.digitalbooking.repository.ProductRepository;
import com.grupo9.digitalbooking.services.ProductService;
import com.grupo9.digitalbooking.response.ApiResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProductById(Integer id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByCategory(Category id) {
        return productRepository.getByCategory(id);
    }

    public List<Product> getProductsByCity(City id)  { return productRepository.getByCity(id);
    }

    @Override
    public List<Product> getProductsByRangeDate(LocalDate check_in_date, LocalDate check_out_date) {
        //System.out.println(check_in_date + " --- " + check_out_date);
        return productRepository.getByRangeDate(check_in_date,check_out_date);
    }

    @Override
    public List<Product> getProductsByCityAndRangeDate(Integer city_id, LocalDate check_in_date, LocalDate check_out_date) {
        return productRepository.getByCityAndRangeDate(city_id, check_in_date,check_out_date);
    }
    @Override
    public List<Product> getRandomProduct() {
        return productRepository.getRandomProduct();
    }

    public ResponseEntity<?> listarProductos() {
        try {
            List<Product> productos = getAllProducts();
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al listar productos", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> buscarProducto(Integer id) {
        try {
            Optional<Product> productoBuscado = getProductById(id);
            if(productoBuscado.isPresent())
                return ApiResponseHandler.generateResponse("Producto encontrado", HttpStatus.OK, productoBuscado.get());
            return ApiResponseHandler.generateResponseError("Producto con ID "+ id + " no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> searchProductByCategory(Category id) {
        try {
            List<Product> productsSearch = getProductsByCategory(id);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos para la categoría", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por categoría", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> crearProducto(Product product){
        try {
            if (product == null || product.getName() == null || product.getCategory() == null || product.getCity() == null) {
                return ApiResponseHandler.generateResponseError("Datos de producto incompletos", HttpStatus.BAD_REQUEST);
            }
            Product creado = saveProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(creado);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al crear producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> editarProducto(Integer id, Product product) {
        try {
            if (product == null) {
                return ApiResponseHandler.generateResponseError("Datos de producto no enviados", HttpStatus.BAD_REQUEST);
            }
            Optional<Product> productoBuscado = getProductById(id);
            if (productoBuscado.isPresent()) {
                product.setId(id);
                updateProduct(product);
                return ApiResponseHandler.generateResponse("Producto actualizado", HttpStatus.OK, product);
            } else {
                return ApiResponseHandler.generateResponseError("Producto con ID: " + id + " no encontrado", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al actualizar producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> eliminarProducto(Integer id){
        try {
            if(getProductById(id).isPresent()){
                deleteProductById(id);
                return ApiResponseHandler.generateResponse("Producto eliminado", HttpStatus.OK, null);
            }
            return ApiResponseHandler.generateResponseError("Producto con ID: " + id + " no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al eliminar producto", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> searchProductByCity(City id) {
        try {
            List<Product> productsSearch = getProductsByCity(id);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos para la ciudad", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por ciudad", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> searchProductsByRangeDate(LocalDate startDate, LocalDate endDate) {
        try {
            List<Product> productsSearch = getProductsByRangeDate(startDate, endDate);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos en el rango de fechas", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por fechas", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> searchProductsByCityAndRangeDate(Integer cityId, LocalDate startDate, LocalDate endDate) {
        try {
            List<Product> productsSearch = getProductsByCityAndRangeDate(cityId, startDate, endDate);
            if(!productsSearch.isEmpty()){
                return ResponseEntity.ok(productsSearch);
            } else {
                return ApiResponseHandler.generateResponseError("No se encontraron productos para la ciudad y rango de fechas", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al buscar productos por ciudad y fechas", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> findAllRandom(){
        try {
            List<Product> productos = getRandomProduct();
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ApiResponseHandler.generateResponseError("Error interno al obtener productos aleatorios", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
