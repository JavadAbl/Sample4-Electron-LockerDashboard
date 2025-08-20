import { Route, Router } from 'wouter';
import Traffic from '../Traffic/Traffic';
import Members from '../Members/Members';
import Locker from '../Locker/Locker';
import Sidebar from '@renderer/components/Sidebar.tsx/Sidebar';

export default function Index() {
  return (
    <>
      <div className="flex" data-theme={'light'}>
        <div className="">
          <Sidebar />
        </div>

        <div className="grow shrink">
          <Router>
            <Route path="/" component={Traffic} />
            <Route path="/Members" component={Members} />
            <Route path="/Lockers" component={Locker} />
          </Router>
        </div>
      </div>
    </>
  );
}
