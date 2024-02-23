import { Trip } from "types/index";

export const initialState: { trips: Trip[] } = {
    trips: [
        {
            id: '1', city: 'Berlin', 'startDate': "2024-02-25",
            'endDate': "2024-02-29"
        },
        {
            id: '2', city: 'Tokyo', 'startDate': "2024-02-25",
            'endDate': "2024-02-29"
        },
        {
            id: '3',
            city: 'Barcelona',
            'startDate': "2024-02-26",
            'endDate': "2024-02-28"
        },
    ],
};


export const cities = [
    { city: 'Milano' },
    { city: 'Kyiv' },
];
