import { HiCheckCircle,HiXCircle,HiInformationCircle,HiExclamation } from "react-icons/hi";
import { Alert } from "@material-tailwind/react";

const alert = ({ message, type }) => {
    if (type === 'success') {
        return (
            <Alert
                icon={<HiCheckCircle />}
                className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946] items-center"
            >
                {message}
            </Alert>
        );
    }
    if (type === 'error') {
        return (
            <Alert
                icon={<HiXCircle />}
                className="rounded-none border-l-4 border-[#f44336] bg-[#f44336]/10 font-medium text-[#f44336] items-center"
            >
                {message}
            </Alert>
        );
    }
    if (type === 'neutral') {
        return (
            <Alert
                icon={<HiInformationCircle />}
                className="rounded-none border-l-4 border-[#00D7FD] bg-[#00D7FD]/10 font-medium text-[#00D7FD] items-center"
            >
                {message}
            </Alert>
        );
    }
    if (type === 'warning') {
        return (
            <Alert
                icon={<HiExclamation />}
                className="rounded-none border-l-4 border-[#FFD932] bg-[#FFD932]/10 font-medium text-[#FFD932] items-center"
            >
                {message}
            </Alert>
        );
    }
}

export default alert;