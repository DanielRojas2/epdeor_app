import { useEffect } from "react"

function ModalComponent({ isOpen, onClose, title, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [!isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
                    <h2 className="text-lg dark:text-gray-100">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    )
}

export default ModalComponent