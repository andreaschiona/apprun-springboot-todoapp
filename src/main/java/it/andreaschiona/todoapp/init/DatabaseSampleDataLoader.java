package it.andreaschiona.todoapp.init;

import it.andreaschiona.todoapp.model.EnumStatus;
import it.andreaschiona.todoapp.model.Todo;
import it.andreaschiona.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DatabaseSampleDataLoader implements CommandLineRunner {

    private final TodoRepository repository;

    @Autowired
    public DatabaseSampleDataLoader(TodoRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Todo todo1 = new Todo();
        todo1.setName("Dummy Todo");
        todo1.setDescription("My first Todo");
        todo1.setCreationDate(new Date());
        todo1.setStatus(EnumStatus.OPEN);
        this.repository.save(todo1);
    }

}
