package com.grupo9.digitalbooking.repository;

import com.grupo9.digitalbooking.model.FavoriteProduct;
import com.grupo9.digitalbooking.model.Product;
import com.grupo9.digitalbooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteProductRepository extends JpaRepository<FavoriteProduct, Integer> {
    List<FavoriteProduct> findByUser(User user);
    List<FavoriteProduct> findByProduct(Product product);
    List<FavoriteProduct> findByUserId(Integer userId);
    List<FavoriteProduct> findByProductId(Integer productId);
    boolean existsByUserAndProduct(User user, Product product);
}

