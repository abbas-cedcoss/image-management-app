import React, { useEffect } from 'react';
import { actionCreators, State, store } from '../Core/statemanagement/index'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { ActionType } from '../Core/statemanagement/action-types';
import getimage from './Apihelper';

function Landing() {
    const dispatch = useDispatch();
    const { addImage, deleteImage } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector((state: State) => state.imagereducer);

    const getImage = async () => {
        console.log(1)
        let modifiedData: any = [];
        const { results, total } = await getimage('nature');
        if (total > 0) {
            results.forEach((image: { urls: any; user: any; alt_description: any; }) => {
                let { urls, user, alt_description } = image;
                modifiedData.push({
                    urls, user, alt_description
                })
            });
        };
        addImage(modifiedData);
    }

    useEffect(() => {
        getImage();
    }, []);

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Image Management App</h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
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
                        <div className="grid grid-cols-3 gap-1 justify-center">
                            {
                                Object.keys(state).map(image => {
                                    return <div key={image}>
                                        <img className="rounded-t-lg" width='100px' height='100px' src={state[image]['urls']['full']} alt="" />
                                    </div>
                                })
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Landing