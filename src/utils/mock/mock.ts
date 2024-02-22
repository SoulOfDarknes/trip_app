import { Trip } from "types/index";

export const initialState: { trips: Trip[] } = {
    trips: [
        { id: '1', city: 'Berlin' },
        { id: '2', city: 'Tokyo' },
        { id: '3', city: 'Barcelona' },
    ],
};


export const cities = [
    { name: "L'viv" },
    { name: 'Milano' },
    // ... інші міста
];
