import './App.css';
import Navbar from './assets/components/navbar';
import Manager from './assets/components/Manager';
import Footer from './assets/components/footer';

function App() {

  return (
    <>
    <Navbar/>
    <div className="min-h-[79vh]">
        <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
