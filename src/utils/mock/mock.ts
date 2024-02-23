import { Trip } from "types/index";

export const initialState: { trips: Trip[] } = {
    trips: [
        {
            id: '1', city: 'Berlin', 'startDate': "2024-02-23",
            'endDate': "2024-02-25"
        },
        {
            id: '2', city: 'Tokyo', 'startDate': "2024-02-23",
            'endDate': "2024-02-25"
        },
        {
            id: '3',
            city: 'Barcelona',
            'startDate': "2024-02-23",
            'endDate': "2024-02-25"
        },
    ],
};


export const cities = [
    { city: 'Milano' },
    { city: 'Kyiv' },
    // ... інші міста
];
