import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Listbox, Transition } from '@headlessui/react'
import { initalActionStates } from '../Core/Helper/helper';
import MyModal from './MyModal';

interface Props {
    updateState: (type: any, data: any) => void;
    imagereducer: [];
    componentState: [];
    renderParent: Boolean;
    renderParentFn: (param: any) => void;
}

function Actions(props: Props) {
    const [states, setSelected] = useState<any>(initalActionStates);

    function updateState(type: any, value: any, helperFunction = () => { }) {
        states[type] = value;
        setSelected({ ...states });
        helperFunction();
    }

    function sortingHelper() {
        switch (states['selectedSortType']['name']) {
            case "Description":
                let imageHolder: any = [...props.imagereducer];
                let modifiedImageData = imageHolder.sort((a: any, b: any) => (a.alt_description !== null && b.alt_description !== null) && a?.alt_description.toLowerCase() > b?.alt_description.toLowerCase() ? 1 : -1);
                props.updateState('imageArray', modifiedImageData);
                break;
            case 'Date':

                break;
            default:
                break;
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex  items-center mb-6">
                <div className="flex items-center h-5">
                    <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                        let temp: any = [...props.imagereducer];
                        Object.keys(temp).map(index => {
                            temp[index]['isSelected'] = !temp[index]['isSelected'];
                        });
                        props.updateState('imageArray', temp);
                    }}>Select All</button>
                </div>
            </div>
            <div className="flex  items-center mb-6">
                <div className="flex items-center h-5">
                    <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => {
                        updateState('openModal', !states['openModal']);
                    }}>Add Image</button>
                </div>
            </div>
            <div className="flex  items-center mb-6">
                <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => {
                    // let tempImages = props.reduxState.filter((element: any, index: any) => {
                    //     // console.log(componentState['selectedImage'] , props.reduxState[index])
                    //     if (componentState['selectedImage']?.[index] && componentState['selectedImage'][index] !== undefined) {
                    //         console.log('props.reduxState[index]', props.reduxState[index], "componentState['selectedImage'][index]", element)
                    //         if (componentState['selectedImage'][index]['id'] === props.reduxState[index]['id']) {
                    //             console.log('object', componentState['selectedImage'][index])
                    //         }
                    //     }
                    //     else {
                    //     }
                    // });
                }}>Delete</button>
            </div>

            <div className="flex  items-center mb-8">
                <Listbox value={states['selectedSortType']} onChange={(event) => {
                    updateState('selectedSortType', event, sortingHelper)
                }}>
                    <Listbox.Label>Sort by:&nbsp; </Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{states['selectedSortType']['name']}</span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {states['sortingOptions'].map((person: any, personIdx: number) => (
                                <Listbox.Option
                                    key={personIdx}
                                    value={person}
                                    className='cursor-default select-none relative py-2 pl-2'
                                    style={{ cursor: 'pointer' }}
                                >
                                    {person.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>
            <MyModal
                isOpen={states['openModal']}
                updateState={updateState}
                renderParentFn={props.renderParentFn}
                renderParent={props.renderParent}
            />
        </div>
    )
}

function mapStateToProps(mapStateToProps: any) {
    return mapStateToProps;
}

export default connect(mapStateToProps)(Actions)


