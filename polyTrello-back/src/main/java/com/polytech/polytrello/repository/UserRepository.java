package com.polytech.polytrello.repository;

public interface UserRepository {

    public void save(User user);

    public User findUserByUsername(String username);
}
