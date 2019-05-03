package it.andreaschiona.todoapp.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.andreaschiona.todoapp.model.CreateTodoRequest;
import it.andreaschiona.todoapp.model.EnumStatus;
import it.andreaschiona.todoapp.model.RestResponse;
import it.andreaschiona.todoapp.model.Todo;
import it.andreaschiona.todoapp.repository.TodoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Api(tags = {"TODO"}, description = "Service for manage the TODO")
@RestController
@RequestMapping("/api/todo")
public class TodoRestController {

    private static final Logger LOG = LoggerFactory.getLogger(TodoRestController.class);

    @Autowired
    private TodoRepository todoRepository;

    @ApiOperation(value = "List of all TODO")
    @GetMapping("/")
    public List<Todo> getTodoList() {
        LOG.info("*** GET TODO List");
        List<Todo> ret = new ArrayList<>();
        todoRepository.findAll().forEach(ret::add);
        return ret;
    }

    @ApiOperation(value = "Create a new TODO")
    @PostMapping("/")
    public RestResponse addTodo(@Valid @RequestBody final CreateTodoRequest todoRequest) {
        LOG.info("*** POST NEW TODO ");
        Todo todo = new Todo();
        todo.setStatus(EnumStatus.OPEN);
        todo.setName(todoRequest.getName());
        todo.setDescription(todoRequest.getDescription());
        todo.setCreationDate(new Date());
        todoRepository.save(todo);

        RestResponse resp = new RestResponse();
        resp.setCode("0");
        resp.setMessage("TODO created");
        return resp;
    }
}
