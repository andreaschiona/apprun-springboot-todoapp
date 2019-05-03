package it.andreaschiona.todoapp.model;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;


@Data
@Entity
public class Todo {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String description;

    private Date creationDate;

    private Date closedDate;

    @Enumerated(EnumType.STRING)
    private EnumStatus status;


}
