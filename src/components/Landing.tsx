import React, { useEffect, useState } from 'react';
import { actionCreators, State } from '../Core/statemanagement/index'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import getimage from './Apihelper';
import { initialStates } from '../Core/Helper/helper';

function Landing() {
    const dispatch = useDispatch();
    const { addImage, deleteImage } = bindActionCreators(actionCreators, dispatch);
    const reduxState = useSelector((reduxState: State) => reduxState.imagereducer);
    const [componentState, setComponentState] = useState<any>(initialStates);

    const getImage = async () => {
        let modifiedData: any = [];
        const { results, total } = await getimage(componentState['imageText'] === '' ? 'nature' : componentState['imageText']);
        if (total > 0) {
            results.forEach((image: { urls: any; user: any; alt_description: any; }) => {
                let { urls, user, alt_description } = image;
                modifiedData.push({
                    urls, user, alt_description, isSelected: false
                })
            });
        };
        addImage(modifiedData);
    }

    useEffect(() => {
        getImage();
    }, []);

    function updateState(type = '', value = '', helperFunction = () => { }) {
        componentState[type] = value;
        setComponentState({ ...componentState });
        helperFunction();
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Image Management App</h2> */}
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="flex items-center">
                            <input
                                name="search"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Search image"
                                value={componentState['imageText']}
                                onChange={(event) => updateState('imageText', event.target.value, getImage)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => {
                                        let temp = { ...reduxState };
                                        Object.keys(temp).map(index => {
                                            temp[index]['isSelected'] = !temp[index]['isSelected'];
                                        });
                                        addImage(temp);
                                    }}>Select All</button>
                                </div>
                            </div>

                            <div className="flex items-start mb-6">
                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1 justify-center">
                            {
                                Object.keys(reduxState).map((image, index) => {
                                    return <div key={image} onClick={() => {
                                        let temp = { ...reduxState };
                                        temp[index]['isSelected'] = !temp[index]['isSelected'];
                                        addImage(temp);
                                    }}>
                                        <div className="justify-center">
                                            <img style={{ opacity: reduxState[image]['isSelected'] ? 0.4 : 1, cursor: 'pointer' }} className="rounded-t-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl" src={reduxState[image]['urls']['thumb']} alt="" />
                                        </div>
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