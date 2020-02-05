import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
    yield all([call(fetchCollectionsStart),
        call(userSagas)        
    /*, any other sagas (this is the reason we use all ) */
    ]);
}