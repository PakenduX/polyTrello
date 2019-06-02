package com.polytech.polytrello.business;

import com.polytech.polytrello.repository.Task;

import java.util.List;

/**
 * Le service qui gère les différentes tâches
 * @author Mama et Zakaria
 */
public interface TaskService {

    public void save(Task task);
    public List<Task> getTasks(String username);
    public void deleteTask(long id);
}
