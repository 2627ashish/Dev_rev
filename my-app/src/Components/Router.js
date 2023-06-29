import {BrowserRouter,Route} from 'react-router-dom';
import Header from './Header';
import Details from './Details';
function Router() {
        return (
            <BrowserRouter>
            <Header/>
            <Route path="/details" component={Details}/>
            </BrowserRouter>
        )
    
}

export default Router;