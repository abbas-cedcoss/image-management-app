import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { initialModalStates } from '../Core/Helper/helper';
import getimage from './Apihelper';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Core/statemanagement';

interface Props {
    isOpen: any;
    updateState: (type: any, array: any) => void;
    renderParentFn: (type: any) => void;
    renderParent: Boolean
}

function MyModal(props: Props): JSX.Element {
    const [states, setStates] = useState<any>(initialModalStates);
    const dispatch = useDispatch<any>();
    const { addImage, deleteImage } = bindActionCreators(actionCreators, dispatch);
    const reduxState = useSelector((reduxState: any) => reduxState.imagereducer);

    function closeModal() {
        props.updateState('openModal', false);
        updateState('imageArray', []);
        updateState('addImageText', '');
    }

    function updateState(type: any, value: any, helperFunction = () => { }) {
        states[type] = value;
        setStates({ ...states });
        helperFunction();
    }
    async function addImages() {
        let modifiedData: any = [];
        const { results, total } = await getimage(states['addImageText']);
        if (total > 0) {
            results.forEach((image: { urls: any; user: any; alt_description: any; }, index: number) => {
                let { urls, user, alt_description } = image;
                modifiedData.push({
                    urls, user, alt_description, isSelected: false, id: index
                })
            });
        };
        updateState('imageArray', modifiedData);
    }

    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add Image
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form className="mt-8 space-y-6" action="#" method="POST">
                                        <div className="flex items-center">
                                            <input
                                                name="search"
                                                autoComplete="current-password"
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Search image"
                                                value={states['addImageText']}
                                                onChange={(event) => {
                                                    updateState('addImageText', event.target.value, addImages);

                                                }}

                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="grid grid-cols-3 gap-1 justify-center">
                                    {
                                        Object.keys(states['imageArray']).map((image, index) => {
                                            return <div key={image} onClick={() => {
                                                let tempImage = [...reduxState, states['imageArray'][index]];
                                                props.renderParentFn('true');
                                                addImage(tempImage);
                                                closeModal();
                                            }}>
                                                <div className="justify-center">
                                                    <img style={{ opacity: states['imageArray'][image]['isSelected'] ? 0.4 : 1, cursor: 'pointer' }} className="rounded-t-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl" src={states['imageArray'][image]['urls']['thumb']} alt="" />
                                                    <p className="text-xs">{states['imageArray'][image]['alt_description']}</p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Add Image
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

function mapStateToProps(mapStateToProps: any) {
    return mapStateToProps;
}

export default connect(mapStateToProps)(MyModal)


