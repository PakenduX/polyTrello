package com.polytech.polytrello.business;


import com.polytech.polytrello.repository.User;

/**
 * Le service d'inscription
 * @author Mama et Zakaria
 */
public interface RegisterService{

    void save(User user);
}
