import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import './App.css';//Moved to global.styles.js

//import HomePage from  './pages/homepage/homepage.component';//to lazy()
//import ShopPage from './pages/shop/shop.component';//to lazy
//import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';//lazy
//import CheckoutPage from './pages/checkout/checkout.component';//to lazy
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

//Global styles instead App.css
import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions';

/*//Not needed with Sagas
import { auth, createUserProfileDocument
  //, addCollectionAndDocuments //To add shop.data.js to firebase
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'
//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';////To add shop.data.js to firebase
*/
/* It works with or wihtout .jsx or .js */

const HomePage = lazy(()=> import('./pages/homepage/homepage.component'));
const ShopPage = lazy(()=> import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(()=>import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(()=>import('./pages/checkout/checkout.component'));

const App =({checkUserSession, currentUser}) => {
  
  useEffect(()=>{
    checkUserSession()
  }, [checkUserSession]);

  /* Not needed with Redux. See dispatch at bottom */
  /*
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }
  */

  //unsubscribeFromAuth = null;

  //componentDidMount(){//Not needed with hooks

    /* With sagas */
    //const { checkUserSession } = this.props;
    //checkUserSession();
    
    //const { setCurrentUser
      //, collectionsArray//To add shop.data.js to firebase
     //} = this.props;

    
    /* //Remove whe using sagas
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        
        //get authenticated user from firebase or create it when not exists
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
          
          //Not needed with Redux. Using setCurrentUser instead 
          
          //this.setState({
            //currentUser: {
              //id: snapShot.id,
              //...snapShot.data()
            //}
          //});

        });      
      }

      setCurrentUser(userAuth);
      //To add shop.data.js to firebase
      
      //addCollectionAndDocuments('collections', collectionsArray.map(
        //({title, items}) => ({ title, items})
      //));
      
    //});
    */
  //}

  //componentWillUnmount() {
    //this.unsubscribeFromAuth();
  //}

  //render(){//Not needed with hooks
    /* Switch shows just one of options, the first matches */  
    return (
      <div>
        <GlobalStyle />
        <Header />        
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route exact path='/signin' render={() => 
                currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignInAndSignUpPage />
                )} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //, collectionsArray: selectCollectionsForPreview //To add shop.data.js to firebase
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
 