export default function Home() {
  async function formAction(formData: FormData) {
    'use server'

    const email = formData.get('email')

    // wait 500ms to simulate a slow network
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log(email)
  }

  return (
    <main className='h-[100dvh] min-h-[300px] w-screen flex flex-col justify-center items-center p-6'>
      <h1 className='text-white font-bold text-4xl text-center px-8 mb-6'>
        Daniel’s News
      </h1>
      <div className='bg-white shadow-xl rounded-lg sm:p-3'>
        <div className='px-6 py-7 sm:p-6'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            Subscribe to my newsletter
          </h3>
          <div className='mt-2 max-w-xl text-sm text-gray-500'>
            <p>You will receive an email once every three months.</p>
          </div>
          <div className='mt-2 text-sm text-gray-500'></div>
          <form className='mt-5 sm:flex sm:items-center' action={formAction}>
            <div className='w-full sm:max-w-xs'>
              <label htmlFor='email' className='sr-only'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDark sm:text-sm sm:leading-6'
                placeholder='paul@dirac.com'
              />
            </div>
            <button
              type='submit'
              className='mt-3 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-black shadow-sm hover:bg-primaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryLight sm:ml-3 sm:mt-0 sm:w-auto'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
