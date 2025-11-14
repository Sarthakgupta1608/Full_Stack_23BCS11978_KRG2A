package com.localmart.backend.dto.customer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;


public record UpdateDetailsRequest(
    @Size(min = 2, max = 100)
    String name,

    @Email
    String email,

    String shippingAddress
) {}