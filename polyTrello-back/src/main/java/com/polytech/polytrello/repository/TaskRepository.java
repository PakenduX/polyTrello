package com.polytech.polytrello.repository;

import java.util.List;

public interface TaskRepository {

    public void save(Task task);
    public List getTasks(String username);
    public Task findTaskById(long id);
    public void deleteTask(long id);
}
