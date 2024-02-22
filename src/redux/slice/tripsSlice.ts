import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip } from '../../types';
import { initialState } from 'utils/mock/mock';

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        addTrip: (state, action: PayloadAction<Trip>) => {
            state.trips.push(action.payload);
        },
        removeTrip: (state, action: PayloadAction<string>) => {
            state.trips = state.trips.filter(trip => trip.id !== action.payload);
        },
    },
});

export const { addTrip, removeTrip } = tripsSlice.actions;

export default tripsSlice.reducer;