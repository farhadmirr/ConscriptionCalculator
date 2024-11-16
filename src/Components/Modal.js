import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faXmarkCircle, faCalendar } from '@fortawesome/free-regular-svg-icons'
const Modal = ({ isOpen, onClose, title, children, isError, subText }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);  // Show modal with slight delay
        } else {
            const timeout = setTimeout(() => setShowModal(false), 300); // Wait for the closing transition
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background overlay with fade transition */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal content with scale and fade transition */}
            <div
                className={`transform transition-all duration-300 bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 relative z-10
            ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            >
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Title */}
                {title && (
                    <div className='w-full flex flex-row-reverse items-center justify-between'>
                        <h2 className="text-gray-800">{title}</h2>
                        {
                            isError ? (
                                <FontAwesomeIcon icon={faCircleXmark} className='bg-red-300 p-1 text-white text-[1.5rem] rounded-full' />
                            ) : (<FontAwesomeIcon icon={faCalendar} className='bg-green-300 p-2 text-white text-[1.5rem] rounded-full' />)
                        }

                    </div>
                )}
                <hr className='mt-2 mb-2' />
                {/* Content */}
                <div className="text-gray-700 flex flex-col">
                    <p className='text-justify' style={{ direction: 'rtl' }}>{children}</p>
                    <p className='text-justify' style={{ direction: 'rtl' }}>{subText}</p>
                </div>
            </div>
        </div>
    );
};

// Example usage of Modal component
// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={() => setIsModalOpen(true)}
//       >
//         Open Modal
//       </button>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Example Modal"
//       >
//         <p>This is a sample modal content. You can add any content here.</p>
//       </Modal>
//     </div>
//   );
// };

export default Modal;
