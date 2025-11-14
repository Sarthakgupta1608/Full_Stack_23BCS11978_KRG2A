package com.localmart.backend.service;

import com.localmart.backend.dto.cart.AddToCartRequest;
import com.localmart.backend.dto.cart.CartItemResponse;
import com.localmart.backend.dto.cart.CartResponse;
import com.localmart.backend.dto.cart.CheckoutRequest;
import com.localmart.backend.model.*;
import com.localmart.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;

    public void addToCart(AddToCartRequest request) {
        Customer customer = getAuthenticatedCustomer();
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Optional<CartItem> existingItemOpt = cartItemRepository.findByCustomer_CustomerIdAndProduct_ProductId(
                customer.getCustomerId(), product.getProductId()
        );

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + request.quantity());
            cartItemRepository.save(existingItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCustomer(customer);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.quantity());
            cartItemRepository.save(cartItem);
        }
    }

    public CartResponse getCart() {
        Customer customer = getAuthenticatedCustomer();
        List<CartItem> cartItems = cartItemRepository.findByCustomer_CustomerId(customer.getCustomerId());

        List<CartItemResponse> itemResponses = cartItems.stream()
                .map(this::mapToCartItemResponse)
                .collect(Collectors.toList());

        Double subtotal = itemResponses.stream()
                .mapToDouble(item -> item.price() * item.quantity())
                .sum();

        return new CartResponse(itemResponses, subtotal);
    }

    @Transactional
    public void checkout(CheckoutRequest request) {
        Customer customer = getAuthenticatedCustomer();
        List<CartItem> cartItems = cartItemRepository.findByCustomer_CustomerId(customer.getCustomerId());

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cannot checkout with an empty cart.");
        }

        Order order = new Order();
        order.setCustomer(customer);
        order.setShippingAddress(request.shippingAddress());
        order.setStatus("Pending");

        double totalAmount = 0.0;
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();

            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException("Not enough stock for " + product.getName());
            }

            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);


            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtPurchase(product.getPrice());

            order.addOrderItem(orderItem);
            
            totalAmount += product.getPrice() * cartItem.getQuantity();
        }

        order.setTotalAmount(totalAmount);
        orderRepository.save(order);
        cartItemRepository.deleteByCustomer_CustomerId(customer.getCustomerId());
    }
    public void removeItemFromCart(Long cartItemId) {
        Customer customer = getAuthenticatedCustomer();

        cartItemRepository.deleteByCartItemIdAndCustomer_CustomerId(cartItemId, customer.getCustomerId());
    }

    private Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String customerEmail = authentication.getName();

        return customerRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found"));
    }

    private CartItemResponse mapToCartItemResponse(CartItem cartItem) {
        Product product = cartItem.getProduct();
        return new CartItemResponse(
                cartItem.getCartItemId(),
                product.getProductId(),
                product.getName(),
                product.getPrice(),
                product.getImageUrl(),
                cartItem.getQuantity(),
                product.getSeller().getStoreName()
        );
    }
}