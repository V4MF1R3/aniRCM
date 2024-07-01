import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Results from './components/Results';
import NoPage from './components/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <route path='/' element={<Layout />}>
          <route index element={<Home />} />
          <route path="results/:mal_id" element={<Results />} />
          <route path element={<NoPage />} />
        </route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
