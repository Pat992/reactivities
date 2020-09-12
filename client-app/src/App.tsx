import React from 'react';
import './App.css';
import { Header, Icon } from 'semantic-ui-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
    </div>
  );
}

export default App;
