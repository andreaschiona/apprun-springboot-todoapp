import app, {Component} from 'apprun';

export default class HomeComponent extends Component {
  state = {};

  view = (state) => {
    return <><div><button $onclick='fetchTodo'>Refresh</button></div>
      {state.todolist && 
        <h3>{state.todolist[0].name}</h3> }
      </>};

  update = {
    '#Home': async state => {
      const response = await fetch('/api/todo/');
      const todolist = await response.json();
      return {todolist};
    }

  };
}

