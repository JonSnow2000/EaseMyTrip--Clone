import React from 'react'
import { useNavigate } from 'react-router-dom';


function Buspayment() {
    const navigate = useNavigate()
    return (
        <div>
            <div class="max-w-4xl mx-auto p-4 bg-blue-50 rounded-lg shadow-md">
                <div class="flex items-center mb-4">
                    <img src="https://placehold.co/40x40" alt="bus icon" class="mr-2" />
                    <h2 class="text-lg font-semibold">Bus Details</h2>
                </div>
                <div class="bg-blue-100 p-4 rounded-lg">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <h3 class="text-sm font-semibold">Pune → Bangalore</h3>
                            <p class="text-xs bg-yellow-100 inline-block px-2 py-1 rounded">12-06-2024</p>
                        </div>
                        <div class="text-center">
                            <p class="text-sm font-semibold">Departure Time</p>
                            <p class="text-lg font-bold">18:30</p>
                        </div>
                        <div class="text-center">
                            <img src="https://placehold.co/40x20" alt="bus route" />
                            <p class="text-xs">15h 00m</p>
                        </div>
                        <div class="text-center">
                            <p class="text-sm font-semibold">Arrival Time</p>
                            <p class="text-lg font-bold">09:30</p>
                        </div>
                        <div class="text-center">
                            <p class="text-sm font-semibold">Seat no(s)</p>
                            <p class="text-xs bg-yellow-100 inline-block px-2 py-1 rounded">I(SL)</p>
                        </div>
                        <div class="text-center">
                            <p class="text-sm font-semibold">No of Passengers(s)</p>
                            <p class="text-lg font-bold">1</p>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="flex items-start mb-2">
                            <div class="mr-2">
                                <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
                                <div class="w-0.5 h-8 bg-gray-800 mx-auto"></div>
                                <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
                            </div>
                            <div>
                                <p class="text-xs font-semibold bg-gray-100 inline-block px-2 py-1 rounded">Boarding Time & Address</p>
                                <p class="text-sm font-semibold">06:00 PM</p>
                                <p class="text-xs">Tale Gaon Toll Naka Tale Gaon Toll Naka Tale Gaon Toll Naka 911934336</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="mr-2">
                                <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
                            </div>
                            <div>
                                <p class="text-xs font-semibold bg-gray-100 inline-block px-2 py-1 rounded">Dropping Time & Address</p>
                                <p class="text-sm font-semibold">08:35 AM</p>
                                <p class="text-xs">Devas pet By Pass</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-xs font-semibold bg-gray-100 inline-block px-2 py-1 rounded">Bus Operator</div>
                        <div class="ml-2">
                            <p class="text-sm font-semibold">Shree Balaji Tour and Travel</p>
                            <p class="text-xs">Ashok Leyland AC Seater/Sleeper (2 + 1)</p>
                        </div>
                    </div>
                </div>
                <div class="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <div class="flex items-center">
                        <img src="https://placehold.co/20x20" alt="plus icon" class="mr-2" />
                        <p class="text-sm font-semibold">Use GSTIN for this booking <span class="text-xs">(OPTIONAL)</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buspayment