import { configureStore } from '@reduxjs/toolkit';
import tripsReducer from './slice/tripsSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { weatherApi } from './api/weatherApi';

const rootReducer = combineReducers({
    trips: tripsReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
});

const persistConfig = {
    key: 'trips',
    storage,
    whitelist: ['trips'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(weatherApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;