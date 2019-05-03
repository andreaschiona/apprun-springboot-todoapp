package it.andreaschiona.todoapp.repository;

import it.andreaschiona.todoapp.model.Todo;
import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository<Todo, Long> {
}
