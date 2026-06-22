/**
 * Button Component
 * Props:
 * - text: string
 * - onClick: function
 */

export default function Button({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"    
        >
            {text}
        </button>
    )
}