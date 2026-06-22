/**
 * Input Component
 * Props:
 * - placeholder: string
 * - type: string
 */

export default function Input({ placeholder, type = "text" }) {
    return (
        <input
            type = {type}
            placeholder = {placeholder}
            className = "border p-2 rounded w-full"
        />
    );
}