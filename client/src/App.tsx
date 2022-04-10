import 'styles/sass/main.scss';

import NavigationContainer from 'Containers/Navigation';
import MainContent from 'Containers/MainContent/MainContent';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <NavigationContainer />
      <MainContent />
    </div>
  );
};

export default App;
