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
            results.forEach((image: { urls: any; user: any; alt_description: any; }, index: number) => {
                let { urls, user, alt_description } = image;
                modifiedData.push({
                    urls, user, alt_description, isSelected: false, id: index
                })
            });
        };
        addImage(modifiedData); //store images on redux store
        componentState['imageArray'] = modifiedData;
        updateState('imageArray', modifiedData);
    }

    useEffect(() => {
        getImage();
    }, []);

    function updateState(type = '', value = '', helperFunction = () => { }) {
        componentState[type] = value;
        setComponentState({ ...componentState });
        helperFunction();
    }

    function addOrRemoveItemsFromStack(imageArr: any = {}, index: number = 0) {
        let tempSelectedImages: any = [];
        tempSelectedImages.push(imageArr[index], ...componentState['selectedImage']);
        componentState['selectedImage'] = tempSelectedImages.filter((v: { id: any; }, i: any, a: any[]) => a.findIndex(v2 => (v2.id === v.id)) === i)
        if (!imageArr[index]['isSelected']) {
            componentState['selectedImage'] = tempSelectedImages.filter((key: any) => key['id'] !== index);
        }
        setComponentState({ ...componentState });
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Image Management App</h2>
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
                                onChange={(event) => {
                                    updateState('imageText', event.target.value);
                                    console.log(reduxState, event.target.value)
                                    let tempState = reduxState.filter((element: { [x: string]: string | string[]; }) => element['alt_description'] != null && element['alt_description'].includes(componentState['imageText']));
                                    updateState('imageArray', tempState);
                                }}
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
                                        updateState('imageArray', temp);
                                    }}>Select All</button>
                                </div>
                            </div>

                            <div className="flex items-start mb-6">
                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => {
                                    let tempImages = reduxState.filter((element: any, index: any) => {
                                        // console.log(componentState['selectedImage'][index] , reduxState[index]['id'])
                                        if (componentState['selectedImage']?.[index]?.['id'] !== undefined) {
                                            console.log('reduxState[index]', reduxState[index], "componentState['selectedImage'][index]", componentState['selectedImage'][index])
                                            // console.log(componentState['selectedImage'][index]['id'] , reduxState[index]['id'])
                                            if (componentState['selectedImage'][index]['id'] !== reduxState[index]['id']) {
                                                // console.log(element)
                                                return element;
                                            }
                                        }
                                    });
                                    // console.log(tempImages)
                                }}>Delete</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1 justify-center">
                            {
                                Object.keys(componentState['imageArray']).map((image, index) => {
                                    return <div key={image} onClick={() => {
                                        let tempImage = { ...componentState['imageArray'] };
                                        tempImage[index]['isSelected'] = !tempImage[index]['isSelected'];
                                        updateState('imageArray', tempImage);
                                        // add or remove elements
                                        addOrRemoveItemsFromStack(tempImage, index);
                                    }}>
                                        <div className="justify-center">
                                            <img style={{ opacity: componentState['imageArray'][image]['isSelected'] ? 0.4 : 1, cursor: 'pointer' }} className="rounded-t-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl" src={componentState['imageArray'][image]['urls']['thumb']} alt="" />
                                            <p className="text-xs">{componentState['imageArray'][image]['alt_description']}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Landing