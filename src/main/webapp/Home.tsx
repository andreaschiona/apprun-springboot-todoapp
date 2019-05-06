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
      </>};

  update = {
    '#': async state => {
      app.run('#Home', state);
    },

    '#Home': async state => {
      const response = await fetch('/api/todo/');
      const todolist = await response.json();
      return {todolist};
    }

  };
}

