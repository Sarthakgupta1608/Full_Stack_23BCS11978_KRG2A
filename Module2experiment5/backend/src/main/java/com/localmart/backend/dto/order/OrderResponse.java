package com.localmart.backend.dto.order;

import java.time.LocalDateTime;
import java.util.List;


public record OrderResponse(
    Long orderId,
    LocalDateTime orderDate,
    Double totalAmount,
    String status,
    String shippingAddress,
    List<OrderItemResponse> items
) {}