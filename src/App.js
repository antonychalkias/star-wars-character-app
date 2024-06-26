import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import CharacterList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';
import './App.css';

const { Header, Content } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Header className="app-header">
        <h1 className="app-title">Star Wars Character App</h1>
      </Header>
      <Content className="app-content">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </Content>
    </Layout>
  </Router>
);

export default App;
