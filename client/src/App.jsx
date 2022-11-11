import { Navbar, Welcome, Footer, Services, Transactions } from './components';
import EthProvider from './contexts/EthContext/EthProvider';

const App = () => {
    return (
        <EthProvider>
            <div className="min-h-screen">
                <div className="gradient-bg-welcome">
                    <Navbar />
                    <Welcome />
                </div>
                <Services />
                <Transactions />
                <Footer />
            </div>
        </EthProvider>
    );
};

export default App;
