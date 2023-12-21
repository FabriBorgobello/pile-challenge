import { AccountList } from './components/AccountList';
import { TotalBalance } from './components/TotalBalance';
import { Title } from './components/Typography';

function App() {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="container py-8 px-4 max-w-2xl max-h-screen mx-auto flex flex-col gap-y-8 overflow-hidden bg-white dark:bg-black">
        <Title>Pile coding challenge</Title>
        <TotalBalance />
        <AccountList />
      </div>
    </div>
  );
}

export default App;
