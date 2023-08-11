import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";

export enum TOAST_TYPE {
  SUCCESS,
  ERROR,
  WARNING,
}

type ToastProps = {
  text: string;
  type: TOAST_TYPE;
};

export default function Toast(props: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [props.text]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-center">
                  {props.type === TOAST_TYPE.SUCCESS ? (
                    <ExclamationCircleIcon
                      className="h-5 w-5 mr-2 text-green-400"
                      aria-hidden="true"
                    />
                  ) : props.type === TOAST_TYPE.ERROR ? (
                    <ExclamationCircleIcon
                      className="h-5 w-5 mr-2 text-red-400"
                      aria-hidden="true"
                    />
                  ) : props.type === TOAST_TYPE.WARNING ? (
                    <ExclamationCircleIcon
                      className="h-5 w-5 mr-2 text-yellow-400"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="flex w-0 flex-1 justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-gray-900">
                      {props.text}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryDark focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
