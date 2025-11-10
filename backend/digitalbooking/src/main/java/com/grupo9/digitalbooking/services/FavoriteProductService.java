package com.grupo9.digitalbooking.services;

import com.grupo9.digitalbooking.model.FavoriteProduct;
import com.grupo9.digitalbooking.model.Product;
import com.grupo9.digitalbooking.model.User;

import java.util.List;
import java.util.Optional;

public interface FavoriteProductService {
    List<FavoriteProduct> getAll();
    Optional<FavoriteProduct> getById(Integer id);
    FavoriteProduct save(FavoriteProduct favoriteProduct);
    void deleteById(Integer id);
    List<FavoriteProduct> getByUser(User user);
    List<FavoriteProduct> getByProduct(Product product);
    boolean existsByUserAndProduct(User user, Product product);
}

