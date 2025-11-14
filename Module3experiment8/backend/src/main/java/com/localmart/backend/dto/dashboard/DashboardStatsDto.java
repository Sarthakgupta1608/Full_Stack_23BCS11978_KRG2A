package com.localmart.backend.dto.dashboard;


public record DashboardStatsDto(
    Double totalRevenue,
    Long totalOrders,
    Long totalProducts
) {}