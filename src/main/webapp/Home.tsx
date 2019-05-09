import app, {Component} from 'apprun';
declare var $;

export default class HomeComponent extends Component {
  state = {
    todolist: []
  };

  Todo = ({todo}) => (
    <tr id={todo.id} key={todo.id}>
      <td>{todo.id}</td>
      <td>{todo.name}</td>
      <td>{todo.description}</td>
      <td>{todo.status}</td>
      <td>{todo.creationDate}</td>
      <td>{todo.closedDate}</td>
    </tr>
  );

  

  view = (state) => {
    return <>
      <div>
        <a href="" class="btn btn-primary" data-toggle="modal" data-target="#modalNewForm">New</a>
      </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">State</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Closed Date</th>
          </tr>
          </thead>
          <tbody>
            {state.todolist.map((todo) => 
              <this.Todo todo={todo} />
            )}
          </tbody>
        </table>
        {state.todolist.size == 0 &&
          <div className="todo-empty">No todo are here... yet.</div>
        }

        <div class="modal fade" id="modalNewForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
          aria-hidden='true'>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Create new Todo</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body mx-3">
                <form id="newtodo-form" onsubmit={e => this.run('createNewTodo', e)}>
                  <div class="md-form mb-5">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <input type="string" id="name" class="form-control validate" />
                    <label data-error="wrong" data-success="right" for="name">Todo name</label>
                  </div>
                  <div class="md-form mb-5">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <input type="string" id="description" class="form-control validate" />
                    <label data-error="wrong" data-success="right" for="description">Todo description</label>
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-primary" type="submit" id="save">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
};

  update = {
    '#': async state => {
      app.run('#Home', state);
    },

    '#Home': async state => {
      const response = await fetch('/api/todo/');
      const todolist = await response.json();
      return {todolist};
    },

    'createNewTodo': async (state, e) => {
      //e.preventDefault();
      let todo = {name: e.target["name"].value, description: e.target["description"].value};
      console.log("Going to POST " + JSON.stringify(todo));    
      fetch("/api/todo/",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(todo)
        })
      .then(res => res.json())
      .then(res => console.log(res))
    }
  };
}

