package com.polytech.polytrello.repository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

@Transactional
public class JpaUserRepository implements UserRepository {

    @PersistenceContext
    EntityManager em;

    @Override
    public void save(User user) {
        String hash = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(hash);
        Authority auth = new Authority(user.getUsername(), "user");
        em.persist(user);
        em.persist(auth);
    }

    @Override
    public User findUserByUsername(String username) {
        User user = em.createQuery(
                "SELECT u from User u WHERE u.username = :username", User.class).
                setParameter("username", username).getSingleResult();
        return user;
    }
}
