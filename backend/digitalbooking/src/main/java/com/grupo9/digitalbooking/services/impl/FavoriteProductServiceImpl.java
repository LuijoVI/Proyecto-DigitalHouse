package com.grupo9.digitalbooking.services.impl;

import com.grupo9.digitalbooking.model.FavoriteProduct;
import com.grupo9.digitalbooking.model.Product;
import com.grupo9.digitalbooking.model.User;
import com.grupo9.digitalbooking.repository.FavoriteProductRepository;
import com.grupo9.digitalbooking.services.FavoriteProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteProductServiceImpl implements FavoriteProductService {

    @Autowired
    private FavoriteProductRepository repository;

    @Override
    public List<FavoriteProduct> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<FavoriteProduct> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public FavoriteProduct save(FavoriteProduct favoriteProduct) {
        return repository.save(favoriteProduct);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<FavoriteProduct> getByUser(User user) {
        return repository.findByUser(user);
    }

    @Override
    public List<FavoriteProduct> getByProduct(Product product) {
        return repository.findByProduct(product);
    }

    @Override
    public boolean existsByUserAndProduct(User user, Product product) {
        return repository.existsByUserAndProduct(user, product);
    }
}

