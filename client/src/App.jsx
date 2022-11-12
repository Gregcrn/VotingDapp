import Interface from './components/Interface';
import EthProvider from './contexts/EthContext/EthProvider';

const App = () => {
    return (
        <EthProvider>
            <Interface />
        </EthProvider>
    );
};

export default App;
