import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface PopupModalProps {
    isPopupOpen: boolean;
    setisPopupOpen: (isPopupOpen: boolean) => void;
    children: React.ReactNode;
}

export default function PopupModal(props: PopupModalProps) {
    const escFunction = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
            props.setisPopupOpen(false);
            localStorage.setItem('isPopupOpen', 'false');
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);
        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, []);

    if (!props.isPopupOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10 text-black" onClick={() => props.setisPopupOpen(false)}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:w-1/2 w-full h-2/3 rounded-lg" onClick={(event) => event.stopPropagation()}>
                <FontAwesomeIcon icon={faTimes} size="2x" className="absolute top-2 right-2 cursor-pointer" onClick={() => {
                    props.setisPopupOpen(false);
                    localStorage.setItem('isPopupOpen', 'false');
                }}/>
                {props.children}
            </div>
        </div>
    );
}
