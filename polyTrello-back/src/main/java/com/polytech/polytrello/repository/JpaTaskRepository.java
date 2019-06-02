package com.polytech.polytrello.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

/**
 * La classe permettant de faire tous les accès à la base
 * de données pour l'entité Task
 */

@Transactional
public class JpaTaskRepository implements TaskRepository {

    @PersistenceContext
    EntityManager manager;

    @Override
    public void save(Task task) {
        manager.persist(task);
    }

    @Override
    public List getTasks(String username) {
        Query q = manager.createQuery("select t from Task t where t.username = :username")
                .setParameter("username", username);
        return q.getResultList();
    }

    @Override
    public Task findTaskById(long id) {
        return manager.find(Task.class, id);
    }

    @Override
    public void deleteTask(long id) {
        Task task = manager.find(Task.class, id);
        manager.remove(task);
    }
}
