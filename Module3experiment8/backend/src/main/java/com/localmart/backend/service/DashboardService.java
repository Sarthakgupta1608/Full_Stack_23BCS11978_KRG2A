package com.localmart.backend.service;

import com.localmart.backend.dto.dashboard.DashboardStatsDto;
import com.localmart.backend.model.Seller;
import com.localmart.backend.repository.OrderItemRepository;
import com.localmart.backend.repository.ProductRepository;
import com.localmart.backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SellerRepository sellerRepository;

    public DashboardStatsDto getSellerStats() {

        Seller seller = getAuthenticatedSeller();
        Long sellerId = seller.getSellerId();


        Double totalRevenue = orderItemRepository.findTotalRevenueBySellerId(sellerId);
        Long totalOrders = orderItemRepository.countOrdersBySellerId(sellerId);
        Long totalProducts = productRepository.countBySeller_sellerId(sellerId);


        return new DashboardStatsDto(totalRevenue, totalOrders, totalProducts);
    }

    private Seller getAuthenticatedSeller() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String sellerEmail = authentication.getName();

        return sellerRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Seller not found"));
    }
}