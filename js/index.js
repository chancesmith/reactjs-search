'use strict';

// Table Data
var TableData = React.createClass({
  displayName: 'TableData',

  render: function render() {
    return React.createElement(
      'p',
      null,
      ' ',
      this.props.data,
      ' '
    );
  }
});

// Table Tags
var TableTag = React.createClass({
  displayName: 'TableTag',

  render: function render() {
    return React.createElement(
      'p',
      null,
      React.createElement(
        'strong',
        null,
        'categories:'
      ),
      ' ',
      this.props.tags,
      ' '
    );
  }
});

// Table Element
var TableTitle = React.createClass({
  displayName: 'TableTitle',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h2',
        null,
        ' ',
        this.props.title
      )
    );
  }
});

var SearchMatch = React.createClass({
  displayName: 'SearchMatch',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        null,
        ' Match: ',
        this.props.match
      )
    );
  }
});

// Table
var Table = React.createClass({
  displayName: 'Table',

  render: function render() {

    // We need to get each row and store it in an array
    var rowsTitle = [];
    var search = [];
    var searchterm = this.props.searchTerm; // need this or it doesnt work
    var key = '';
    this.props.data.forEach(function (row) {
      if (row.title.toLowerCase().indexOf(searchterm.toLowerCase()) === -1 && row.tags.toLowerCase().indexOf(searchterm.toLowerCase()) === -1) return;

      // need to grab the correct match
      if (row.title.toLowerCase().indexOf(searchterm.toLowerCase()) === -1) {
        var m = row.tags.toLowerCase().split(' ');
        for (var i in m) {
          if (m[i].indexOf(searchterm.toLowerCase()) !== -1) key = m[i];
        }
      } else {
        key = row.title.toLowerCase();
      }

      rowsTitle.push(React.createElement(TableTitle, { title: row.title }));
      if (searchterm != '') rowsTitle.push(React.createElement(SearchMatch, { match: key }));
      rowsTitle.push(React.createElement(TableTag, { tags: row.tags }));
      rowsTitle.push(React.createElement(TableData, { data: row.content }));
    });

    // Then render all. Render using childs. Send them prop.title and prop.data
    return React.createElement(
      'div',
      null,
      rowsTitle
    );
  }
});

// Search
var Search = React.createClass({
  displayName: 'Search',

  filterList: function filterList(event) {
    this.props.userInput(event.target.value);
  },

  render: function render() {
    return React.createElement('input', { type: 'text',
      placeholder: 'Start Typing',
      value: this.props.searchTerm,
      onChange: this.filterList, autoFocus: true });
  }

});

// App
var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      filterText: '',
      filterText2: ''
    };
  },

  handleUserInput: function handleUserInput(filter) {
    this.setState({
      filterText: filter
    });
  },

  render: function render() {

    return React.createElement(
      'div',
      null,
      React.createElement(
        'header',
        null,
        React.createElement('img', { src: 'http://www.sodiumhalogen.com/up_c/static1.squarespace-Nm4t3ookmK.png' }),
        React.createElement(
          'h1',
          null,
          'Find a CO:member',
          React.createElement('br', null),
          ' that can help you.'
        )
      ),
      React.createElement(Search, { searchTerm: this.state.filterText, userInput: this.handleUserInput }),
      React.createElement(Table, { searchTerm: this.state.filterText, data: this.props.data, tags: this.props.tags })
    );
  }
});

// JSON
var DATA = [{
  "title": "Chance Smith",
  "tags": "code strategy",
  "content": "This guy likes to codes."
}, {
  "title": "Ben Harris",
  "tags": "popvox maker",
  "content": "This fella runs Popvox and flies drones."
}, {
  "title": "William Donnell",
  "tags": "design remote team",
  "content": "The guy is the founder of Sodium Halogen and talks to himself when on his Mac."
}, {
  "title": "Kevin Adelsberger",
  "tags": "marketing design code",
  "content": "This dude builds websites with a profound marketing approach."
}, {
  "title": "Dan Dromygosh",
  "tags": "music rock",
  "content": "This brah has mad customer service skills and knows how to rock your face off."
}, {
  "title": "Austin Thompson",
  "tags": "wood code",
  "content": "Makes cool things with wood and single handly conquered theCO."
}, {
  "title": "Lisa Garner",
  "tags": "blue",
  "content": "Making blue awesome again."
}];

// Render
React.render(React.createElement(App, { data: DATA }), document.getElementById("app"));