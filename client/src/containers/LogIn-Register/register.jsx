import React from 'react'

const Register = () => {
    return (
        <div class="grid min-h-screen tracking-wide font-bold place-items-center">
            <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">
                <h1 class="text-xl font-semibold">Hello there 👋, <span class="font-normal">please fill in your information to continue</span></h1>
                <form class="mt-6">
                    <div class="flex justify-between gap-3">
                        <span class="w-1/2">
                            <label for="firstname" class="block text-xs font-semibold text-gray-600 uppercase">Firstname</label>
                            <input id="firstname" type="text" name="firstname" placeholder="John" autocomplete="given-name" class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                        </span>
                        <span class="w-1/2">
                            <label for="lastname" class="block text-xs font-semibold text-gray-600 uppercase">Lastname</label>
                            <input id="lastname" type="text" name="lastname" placeholder="Doe" autocomplete="family-name" class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200" required />
                        </span>
                    </div>
                    <label
                        for="email"
                        class="block text-xs font-semibold text-gray-600 uppercase"
                    >
                        E-mail
            </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="e-mail address"
                        autocomplete="email"
                        class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        required
                    />

                    <label
                        for="password"
                        class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                        Password
            </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                        autocomplete="current-password"
                        class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                        required
                    />
                    <button type="submit" class="w-full py-3 mt-5 bg-green-700 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-green-600 hover:shadow-none">
                        Sign up
      </button>
                    <p class="flex justify-between inline-block mt-4 text-s text-gray-500 cursor-pointer hover:text-black">Already registered?</p>
                </form>
            </div>
        </div>
    )
}

export default Register
