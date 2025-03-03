import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Button,
  DialogBackdrop,
} from "@headlessui/react";

export default function AlertDialog({
  isOpen,
  setClose,
  ok,
  title,
  description,
}) {
  const handleClose = () => setClose(false);
  const handleConfirm = () => ok();

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full space-y-6 bg-white p-4 flex items-start gap-3.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
              fill="#EEF2FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9993 7.1001C11.5254 7.1001 11.1819 7.38641 10.8922 7.7514C10.6091 8.10802 10.3083 8.62893 9.93813 9.27017L7.7385 13.08C7.36828 13.7213 7.06752 14.2422 6.90023 14.6656C6.72902 15.0991 6.6528 15.5397 6.88976 15.9501C7.12673 16.3605 7.54641 16.5148 8.00737 16.5833C8.45777 16.6501 9.05925 16.6501 9.79968 16.6501H14.1989C14.9394 16.6501 15.5409 16.6501 15.9913 16.5833C16.4522 16.5148 16.8719 16.3605 17.1089 15.9501C17.3458 15.5397 17.2696 15.0991 17.0984 14.6656C16.9311 14.2422 16.6304 13.7213 16.2601 13.08L14.0605 9.27016C13.6903 8.62893 13.3896 8.10801 13.1065 7.75139C12.8167 7.38641 12.4732 7.1001 11.9993 7.1001ZM11.5 14.4707C11.5 14.1946 11.7239 13.9707 12 13.9707H12.025C12.3011 13.9707 12.525 14.1946 12.525 14.4707C12.525 14.7468 12.3011 14.9707 12.025 14.9707H12C11.7239 14.9707 11.5 14.7468 11.5 14.4707ZM12.3996 10.0001C12.3996 9.77918 12.2205 9.6001 11.9996 9.6001C11.7787 9.6001 11.5996 9.77918 11.5996 10.0001L11.5996 13.0001C11.5996 13.221 11.7787 13.4001 11.9996 13.4001C12.2205 13.4001 12.3996 13.221 12.3996 13.0001V10.0001Z"
              fill="#9C9DA0"
            />
          </svg>
          <div className="flex-1 space-y-5">
            <div className="space-y-1">
              <DialogTitle className="font-bold">{title}</DialogTitle>
              <p className="text-sm text-muted-gray">{description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="w-full text-xs font-medium text-onyx-black rounded-md border border-cool-gray py-2"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="w-full text-xs font-medium text-white bg-warm-gray rounded-md border border-cool-gray py-2"
                onClick={handleConfirm}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
