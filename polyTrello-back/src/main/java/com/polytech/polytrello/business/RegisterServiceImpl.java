package com.polytech.polytrello.business;

import com.polytech.polytrello.repository.User;
import com.polytech.polytrello.repository.UserRepository;


public class RegisterServiceImpl implements RegisterService {

    private UserRepository userRepository;

    public RegisterServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void save(User user) {
        this.userRepository.save(user);
    }

}
