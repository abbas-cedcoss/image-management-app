import React, { useEffect } from 'react';
import { actionCreators, State, store } from '../Core/statemanagement/index'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';

function Landing() {
    const dispatch = useDispatch();
    const { addImage, deleteImage } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector((state: State) => state.imagereducer);

    useEffect(() => {
        console.log(state)
    }, []);

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                name="search"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Search"
                            />
                        </div>
                        <div className="text-sm">
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Landing