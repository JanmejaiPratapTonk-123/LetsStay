/**
 * Modal Component
 * Props:
 * - title: string
 * - children: ReactNode
 */

export default function Modal({ title, children }) {
    return (
        <div className="bg-white p-6 rounded shadow-md w-fit mx-auto">
            <h2 className="font-bold mb-2">
                {title}
            </h2>
            {children}
        </div>
    );
}