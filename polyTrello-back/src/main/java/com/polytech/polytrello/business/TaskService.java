package com.polytech.polytrello.business;

import com.polytech.polytrello.repository.Task;

import java.util.List;

public interface TaskService {

    public void save(Task task);
    public List<Task> getTasks(String username);
    public void deleteTask(long id);
}
