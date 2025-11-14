package com.localmart.backend.service;

import com.localmart.backend.dto.auth.LoginRequest;
import com.localmart.backend.dto.auth.LoginResponse;
import com.localmart.backend.dto.auth.RegisterCustomerRequest;
import com.localmart.backend.dto.auth.RegisterSellerRequest;
import com.localmart.backend.dto.auth.UserDetailsDto; // 1. IMPORT
import com.localmart.backend.model.Customer;
import com.localmart.backend.model.Seller;
import com.localmart.backend.repository.CustomerRepository;
import com.localmart.backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private LocalUserDetailsService userDetailsService;

    public void registerCustomer(RegisterCustomerRequest request) {
        if (customerRepository.existsByEmail(request.email()) || sellerRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        Customer customer = new Customer();
        customer.setName(request.name());
        customer.setEmail(request.email());
        customer.setPassword(passwordEncoder.encode(request.password()));
        customerRepository.save(customer);
    }

    public void registerSeller(RegisterSellerRequest request) {
        if (customerRepository.existsByEmail(request.email()) || sellerRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        if (sellerRepository.existsByStoreName(request.storeName())) {
            throw new IllegalArgumentException("Store name is already taken.");
        }
        Seller seller = new Seller();
        seller.setStoreName(request.storeName());
        seller.setOwnerName(request.ownerName());
        seller.setEmail(request.email());
        seller.setPassword(passwordEncoder.encode(request.password()));
        sellerRepository.save(seller);
    }



    public LoginResponse loginUser(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);
        String role = userDetails.getAuthorities().stream()
                        .findFirst()
                        .map(authority -> authority.getAuthority())
                        .orElse("UNKNOWN");
        UserDetailsDto userDto;
        if (role.equals("ROLE_SELLER")) {
            Seller seller = sellerRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalStateException("Seller not found after login"));
            userDto = new UserDetailsDto(seller.getSellerId(), seller.getOwnerName(), seller.getEmail(), seller.getStoreName());
        } else {
            Customer customer = customerRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalStateException("Customer not found after login"));
            userDto = new UserDetailsDto(customer.getCustomerId(), customer.getName(), customer.getEmail(), null);
        }
        return new LoginResponse(token, role, userDto);
    }
}