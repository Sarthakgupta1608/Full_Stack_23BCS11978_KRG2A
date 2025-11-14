package com.localmart.backend.repository;

import com.localmart.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // 1. ADD IMPORT
import org.springframework.data.repository.query.Param; // 2. ADD IMPORT
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomer_CustomerIdOrderByOrderDateDesc(Long customerId);

    @Query("SELECT DISTINCT oi.order FROM OrderItem oi " +
           "WHERE oi.product.seller.sellerId = :sellerId " +
           "ORDER BY oi.order.orderDate DESC")
    List<Order> findOrdersBySellerId(@Param("sellerId") Long sellerId);
}