import React, { useEffect, useState } from 'react';
import { actionCreators, State } from '../Core/statemanagement/index'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import getimage from './Apihelper';
import { initialStates } from '../Core/Helper/helper';
import Actions from './Actions';
import { connect } from 'react-redux';

function Landing(props: any) {
    const dispatch = useDispatch<any>();
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

    function renderParent(shouldRender: any) {
        console.log(shouldRender)
        updateState('renderParent', shouldRender);
    }

    useEffect(() => {
        let temp: any = [...reduxState];
        updateState('imageArray', temp);
    }, [componentState['renderParent']]);

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
        < >
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 main ">
                <div className="max-w-md w-full space-y-8 container">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Image Management App</h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="flex items-center">
                            <input
                                name="search"
                                autoComplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Search image"
                                value={componentState['imageText']}
                                onChange={(event) => {
                                    updateState('imageText', event.target.value);
                                    let tempState = reduxState.filter((element: { [x: string]: string | string[]; }) => element['alt_description'] != null && element['alt_description'].includes(componentState['imageText']));
                                    updateState('imageArray', tempState);
                                }}

                            />
                        </div>
                        {componentState['imageText'] !== '' && <span>
                            <p className="text-xs"><b>{componentState['imageArray'].length} result(s) found!</b></p>
                        </span>}
                        <Actions
                            updateState={updateState}
                            imagereducer={[]}
                            componentState={componentState}
                            renderParent={componentState['renderParent']}
                            renderParentFn={renderParent}
                        />
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

function mapStateToProps(mapStateToProps: any) {
    return mapStateToProps;
}

export default connect(mapStateToProps)(Landing)