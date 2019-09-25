import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from  './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument
  //, addCollectionAndDocuments //To add shop.data.js to firebase
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'
//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';////To add shop.data.js to firebase
/* It works with or wihtout .jsx or .js */

class App extends React.Component {
  
  /* Not needed with Redux. See dispatch at bottom */
  /*
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }
  */

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser
      //, collectionsArray//To add shop.data.js to firebase
     } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        
        /* get authenticated user from firebase or create it when not exists */
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
          
          /* Not needed with Redux. Using setCurrentUser instead */
          /*
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          */

        });      
      }

      setCurrentUser(userAuth);
      /* To add shop.data.js to firebase */
      /*
      addCollectionAndDocuments('collections', collectionsArray.map(
        ({title, items}) => ({ title, items})
      ));
      */
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    /* Switch shows just one of options, the first matches */  
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //, collectionsArray: selectCollectionsForPreview //To add shop.data.js to firebase
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
