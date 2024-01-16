import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Preview from './components/Preview';
import Dashboard from './components/Dashboard';
import ThemeProvider from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
    return (
        <Router>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Preview />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                    <Footer />
                </div>
            </ThemeProvider>
            <Toaster />
        </Router>
    );
}

export default App;