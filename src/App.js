import React, { Component } from 'react';
import './App.css';
import Todo from './components/Todo';




const todo = [
  {id: 0, content: 'Pick up eggs', done: false},
  {id: 1, content: 'Pay electric bill', done: false},
  {id: 2, content: 'Create todo API', done: false},
];

function TodoList({ list, filter = 'all', onItemClick = () => {} }) {
  const filterFunc = filter === 'all' ? () => true : 
    (filter === 'done' ? (item) => item.done : (item) => !item.done);
  const filteredList = list.filter(filterFunc);
  return (
    <ul className="master-list">
      { filteredList.map((item) => 
        <li key={item.id} style={{'textDecoration': item.done ? 'line-through' : 'none'}} onClick={() => onItemClick(item.id)}>{item.content}</li>
      )}
    </ul>
  );
}

function TodoAddNew({ value = '', onChange = () => {}, onAdd = () => {} }) {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <button type="button" onClick={onAdd}>Add new</button>
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
        todoList: todo.slice(),
        filter: 'all',
        newItem: '',
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
  }

  handleItemClick(id) {
    this.setState({ todoList: this.state.todoList.map((item) =>
      item.id === id ? {id, content: item.content, done: !item.done} : item
    )});
  }

  handleFilterClick(filter) {
    this.setState({ filter });
  }

  handleAddNew() {
    if (!this.state.newItem) return;
    const item = {
      id: this.state.todoList.length,
      content: this.state.newItem,
      done: false,
    };
    this.setState({
      todoList : [...this.state.todoList, item],
      newItem: ''
    });
  }

  handleAddChange(event) {
    this.setState({ newItem: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <h2>Todo List</h2>
        <h5><i>Click on items to mark as done</i></h5>
        <TodoList className="listItems" list={this.state.todoList} filter={this.state.filter} onItemClick={this.handleItemClick} />
        Show items: {
          ['all', 'active', 'done'].map((item) =>
            <span><a href="#" onClick={() => this.handleFilterClick(item)}>{item}</a> </span>
          )}
        <TodoAddNew value={this.state.newItem} onAdd={this.handleAddNew} onChange={this.handleAddChange} />
      </div>
    );
  }
}






export default App;
