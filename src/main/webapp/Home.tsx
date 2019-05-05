import app, {Component} from 'apprun';

export default class HomeComponent extends Component {
  state = {};

  Todo = ({todo}) => (
    <tr id={todo.id} key={todo.id}>
      <td className="col-md-1">{todo.id}</td>
      <td className="col-md-1">
          <a className="lbl">{todo.name}</a>
      </td>
      <td className="col-md-2">{todo.description}</td>
      <td className="col-md-1">{todo.status}</td>
      <td className="col-md-1">{todo.creationDate}</td>
      <td className="col-md-1">{todo.closedDate}</td>
    </tr>
  );

  view = (state) => {
    return <>
      {state.todolist ? 
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>State</th>
              <th>Creation Date</th>
              <th>Closed Date</th>
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

