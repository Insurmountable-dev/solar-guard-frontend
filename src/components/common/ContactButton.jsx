
import { Phone } from "lucide-react";

function ContactButton({ phone = "0746148320" }) {
    return (
        <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
            <Phone size={16} />
            <span>
                <label className="cursor-pointer">Contact Us</label>
                {" "}{phone}
            </span>
        </a>
    );
}

export default ContactButton;
