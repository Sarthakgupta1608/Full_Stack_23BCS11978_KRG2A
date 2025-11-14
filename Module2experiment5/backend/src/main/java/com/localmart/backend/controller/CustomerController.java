package com.localmart.backend.controller;

import com.localmart.backend.dto.customer.CustomerDetailsDto;
import com.localmart.backend.dto.customer.UpdateDetailsRequest;
import com.localmart.backend.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@PreAuthorize("hasRole('CUSTOMER')") // Only ROLE_CUSTOMER can use these
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/details")
    public ResponseEntity<CustomerDetailsDto> getCustomerDetails() {
        return ResponseEntity.ok(customerService.getCustomerDetails());
    }

    @PutMapping("/details")
    public ResponseEntity<?> updateCustomerDetails(
            @Valid @RequestBody UpdateDetailsRequest request
    ) {
        try {
            CustomerDetailsDto updatedDetails = customerService.updateCustomerDetails(request);
            return ResponseEntity.ok(updatedDetails);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}