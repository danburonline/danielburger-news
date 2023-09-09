'use client'

import { unsubscribeFormAction } from './actions'
import { useState, useTransition } from 'react'
import Toast, { TOAST_TYPE } from '../../components/Toast'
import BeatLoader from 'react-spinners/BeatLoader'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function UnsubscribePage() {
  let [isPending, startTransition] = useTransition()
  let [returnCode, setReturnCode] = useState(0)
  let [returnMessage, setReturnMessage] = useState('')
  let [email, setEmail] = useState('')
  let [formActionsCompleted, setFormActionsCompleted] = useState(0)

  return (
    <main className="h-[100dvh] min-h-[300px] w-screen flex flex-col justify-center items-center p-6">
      {returnCode === 200 ? (
        <Toast
          key={`${returnCode}-${formActionsCompleted}`}
          text={returnMessage}
          type={TOAST_TYPE.SUCCESS}
        />
      ) : returnCode === 422 ? (
        <Toast
          key={`${returnCode}-${formActionsCompleted}`}
          text={returnMessage}
          type={TOAST_TYPE.ERROR}
        />
      ) : null}
      <h1 className="text-bright font-serif font-bold text-4xl text-center px-8 mb-6">
        Daniel’s News
      </h1>
      <div className="bg-bright shadow-xl rounded-lg sm:p-3">
        <div className="px-6 py-7 sm:p-6">
          <h2 className="text-base font-semibold leading-6 text-dark">
            Unsubscribe from my newsletter
          </h2>
          <div className="mt-2 max-w-xl text-sm text-brightDark">
            <p>Enter the email that you want to remove from my list.</p>
          </div>
          <div className="mt-2 text-sm text-medium"></div>
          <form
            className="mt-5 sm:flex sm:items-center"
            onSubmit={(event) => {
              event.preventDefault()

              // Create a FormData object from the form in the event object
              let formData = new FormData(event.target as HTMLFormElement)

              startTransition(async () => {
                // Pass the FormData object to formAction
                let result = await unsubscribeFormAction(formData)

                if (result) {
                  setReturnCode(result.statusCode)
                  setReturnMessage(result.body)
                  if (result.statusCode === 200) {
                    setEmail('')
                  }

                  setFormActionsCompleted((formActionsCompleted) => formActionsCompleted + 1)
                }
              })
            }}
          >
            <div className="w-full sm:max-w-xs">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                className="block bg-bright w-full rounded-md border-0 p-3 text-dark shadow-sm ring-1 ring-inset ring-medium placeholder:text-medium focus:ring-2 focus:ring-inset focus:ring-magenta sm:text-sm sm:leading-6"
                placeholder="good@bye.com"
                value={email}
              />
            </div>
            <button
              type="submit"
              className={`mt-3 inline-flex w-full items-center justify-center rounded-md bg-magenta px-4 py-3 text-sm font-semibold text-dark shadow-sm hover:bg-magentaBright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-magentaBrighter focus-visible:outline-magenta sm:ml-3 sm:mt-0 sm:w-auto ${
                !email ? 'cursor-not-allowed' : ''
              }`}
              disabled={!email}
            >
              {isPending ? (
                <span className="absolute">
                  <BeatLoader size={'5px'} />
                </span>
              ) : null}
              <span
                className={`flex items-center justify-center ${
                  isPending ? 'opacity-0' : 'opacity-1'
                }`}
              >
                Unsubscribe
                <ArrowRightIcon className="w-4 ml-2" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
