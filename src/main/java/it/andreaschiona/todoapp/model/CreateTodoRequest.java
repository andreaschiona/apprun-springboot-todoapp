package it.andreaschiona.todoapp.model;

import lombok.Data;

@Data
public class CreateTodoRequest {

    private String name;
    private String description;
}
