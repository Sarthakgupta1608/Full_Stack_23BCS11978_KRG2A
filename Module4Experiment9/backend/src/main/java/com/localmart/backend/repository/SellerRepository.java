package com.localmart.backend.repository;

import com.localmart.backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Optional<Seller> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<Seller> findByStoreName(String storeName);

    Boolean existsByStoreName(String storeName);
}