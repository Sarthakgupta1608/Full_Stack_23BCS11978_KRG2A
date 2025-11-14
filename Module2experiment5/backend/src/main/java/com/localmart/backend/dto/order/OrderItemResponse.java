package com.localmart.backend.dto.order;

import java.time.LocalDateTime;
import java.util.List;


public record OrderItemResponse(
    String productName,
    Integer quantity,
    Double priceAtPurchase,
    String imageUrl
) {}
