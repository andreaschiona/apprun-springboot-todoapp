import app, {Component} from 'apprun';

export default class HomeComponent extends Component {
  state = {};

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
      {state.todolist ? 
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
      :
        <div className="article-preview">No articles are here... yet.</div>}

<div class="modal fade" id="modalNewForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title w-100 font-weight-bold">Create new Todo</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body mx-3">
        <form id="newtodo-form" onsubmit={e => this.run('createNewTodo', e)}>>
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
            <button class="btn btn-default" type="submit" id="save">Save</button>
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
      e.preventDefault();
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
      .then(res=>res.json())
      .then(res => console.log(res))
      .then(res => {true});
    },

    // function serializeObject<T>(form) {
    //   let obj = {};
    //   if (typeof form == 'object' && form.nodeName == "FORM") {
    //     for (let i = 0; i < form.elements.length; i++) {
    //       const field = form.elements[i];
    //       if (field.name
    //         && field.type != 'file'
    //         && field.type != 'reset'
    //         && field.type != 'submit'
    //         && field.type != 'button') {
    //         if (field.type == 'select-multiple') {
    //           obj[field.name] = '';
    //           let tempvalue = '';
    //           for (let j = 0; j < form.elements[i].options.length; j++) {
    //             if (field.options[j].selected)
    //               tempvalue += field.options[j].value + ';';
    //           }
    //           if (tempvalue.charAt(tempvalue.length - 1) === ';') obj[field.name] = tempvalue.substring(0, tempvalue.length - 1);
    //         } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
    //           obj[field.name] = field.value;
    //         }
    //       }
    //     }
    //   }
    //   return obj as T;
    // },

    'submit-new-todo': (state, e) => {
      try {
        e.preventDefault();

        let obj = {};
        let form = e.target;
      if (typeof form == 'object' && form.nodeName == "FORM") {
        for (let i = 0; i < form.elements.length; i++) {
          const field = form.elements[i];
          if (field.name
            && field.type != 'file'
            && field.type != 'reset'
            && field.type != 'submit'
            && field.type != 'button') {
            if (field.type == 'select-multiple') {
              obj[field.name] = '';
              let tempvalue = '';
              for (let j = 0; j < form.elements[i].options.length; j++) {
                if (field.options[j].selected)
                  tempvalue += field.options[j].value + ';';
              }
              if (tempvalue.charAt(tempvalue.length - 1) === ';') obj[field.name] = tempvalue.substring(0, tempvalue.length - 1);
            } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
              obj[field.name] = field.value;
            }
          }
        }
      }


        const todo = obj as any; //serializeObject<any>(e.target);
        const headers = { 'Content-Type': 'application/json; charset=utf-8' };
        fetch('/api/todo/', {
          method: 'post',
          headers: headers,
          body: todo
        }).then(function(response) {
          document.getElementById('name').nodeValue = null;
          document.getElementById('description').nodeValue = null;
          return response.json();
        });
      } catch ({ errors }) {
        return { ...state, errors }
      }
    }

  };
}

