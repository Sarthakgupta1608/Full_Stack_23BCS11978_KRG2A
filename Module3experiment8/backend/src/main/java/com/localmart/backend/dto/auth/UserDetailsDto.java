package com.localmart.backend.dto.auth;


public record UserDetailsDto(
    Long id,
    String name,
    String email,
    String storeName
) {}