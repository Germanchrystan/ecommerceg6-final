import React from "react";

const LogIn = () => {
  return (
    <div class="grid min-h-screen tracking-wide font-bold place-items-center">
      <div
        class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          Hello there 👋 and Welcome Back!
          </h2>

        <form class="mt-10" method="POST">
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

          <button
            type="submit"
            class="w-full py-3 mt-10 bg-green-700 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-green-600 hover:shadow-none"
          >
            Login
            </button>

          <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <a href="reset" class="flex-2 underline">
              Forgot password?
              </a>

            <p class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
              or
              </p>

            <a href="register" class="flex-2 underline">
              Create an Account
              </a>
          </div>
        </form>
      </div>
    </div>
    // <div>
    //     <section class="min-h-screen flex flex-col">
    //         <div class="flex flex-1 items-center justify-center">
    //             <div class="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
    //                 <form class="text-center">
    //                     <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
    //                         Sign in
    //                     </h1>
    //                     <div class="py-2 text-left">
    //                         <label for="email" class="text-gray-700 px-1 block mb-1">Email Address:</label>
    //                         <input type="email" class="bg-gray-200 border-2 border-gray-200 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 " id="email" placeholder="Email" />
    //                     </div>
    //                     <div class="py-2 text-left">
    //                         <label for="password" class="text-gray-700 px-1 block mb-1">Password:</label>
    //                         <input type="password" class="bg-gray-200 border-2 border-gray-200 focus:outline-none block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Password" id="password" />
    //                     </div>
    //                     <div class="py-2">
    //                         <button type="submit" class="border-2 border-gray-100 focus:outline-none bg-green-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
    //                             Sign In
    //                         </button>
    //                     </div>
    //                 </form>
    //                 <div class="text-center">
    //                     <a href="/reset" class="hover:underline">Forgot password?</a>
    //                 </div>
    //                 <div class="text-center mt-12">
    //                     <span>
    //                         Don't have an account?
    //                     </span>
    //                     <a href="/register" class="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800">Create One</a>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // </div>
  );
};

export default LogIn;
