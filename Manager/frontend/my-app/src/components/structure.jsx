import { Outlet } from 'react-router-dom';
import Header from './header';
function Structure() {
    return <main>
        <Header />
        <Outlet />

    </main>;
}

export default Structure;