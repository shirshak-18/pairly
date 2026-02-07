import React from "react";
import { Link, NavLink } from "react-router-dom";
import girlImage from "../../assets/2.jpg";
import boyImage from "../../assets/1.jpg";
import friendsImage from "../../assets/friends.jpg";
import anonymousImage from "../../assets/3.jpg";
import crushListImage from "../../assets/4.jpg";
import profilesImage from "../../assets/5.jpg";
import msgImage from "../../assets/6.jpg";
import searchCrushImage from "../../assets/7.jpg";
import notificationImage from "../../assets/8.jpg";

const HomeContainer = () => {
  return (
    <div className="pt-[100px] px-3">
      <p className="lead text-center">
        A private space to connect, express, and discover — everything
        <strong> anonymously</strong>.
      </p>
      <h1 className="text-5xl font-bold text-center text-white mt-5">
        Welcome to <span className="text-blue-600">Pairly</span>
      </h1>

      <p className="text-center text-slate-400 mt-3">
        Connect, express, and discover — anonymously and securely.
      </p>

      <p className="text-center text-slate-500 mt-2">
        Pairly is a private social and dating platform built for meaningful
        conversations, genuine connections, and safe self-expression.
      </p>

      {/*  */}
      <div className="flex justify-center h-[64] my-5 text-xl space-x-2 flex-wrap max-[1300px]:flex-col items-center">
        <div className="flex">
          <img
            src={friendsImage}
            alt=""
            className="rounded-md h-64 max-[800px]:h-[150px]"
          />
        </div>
        <div className="flex space-x-2 max-[1300px]:mt-3">
          <img
            src={girlImage}
            alt=""
            className="w-64 h-64 rounded-md max-[800px]:w-[150px] max-[800px]:h-[150px]"
          />
          <img
            src={boyImage}
            alt=""
            className="w-64 h-64 rounded-md max-[800px]:w-[150px] max-[800px]:h-[150px]"
          />
        </div>
      </div>
      {/*  */}

      <NavLink
        className="gradient_bg flex justify-center p-3 rounded-md mb-5 font-bold text-3xl"
        to={"/signup"}
      >
        Join Pairly
      </NavLink>

      <div className="flex flex-col items-center space-y-8">
        <h1>Features we added just for you!</h1>
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-3 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col-reverse">
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Anonymous Messages
            </h2>

            <p className="text-gray-600">
              Share your thoughts freely with anonymous messaging. Connect
              without pressure, judgment, or identity — just honest
              conversations.
            </p>
          </div>
          <img
            src={anonymousImage}
            alt="Anonymous Messages"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
        </div>
        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-5 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col">
          <img
            src={crushListImage}
            alt="Crush List"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Crush List
            </h2>

            <p className="text-gray-600">
              Save up to three profiles privately. Get notified when interest is
              mutual and take the next step with confidence.
            </p>
          </div>
        </div>
        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-3 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col-reverse">
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              User Profiles
            </h2>

            <p className="text-gray-600">
              Explore verified profiles, view shared interests, and discover
              people you may connect with.
            </p>
          </div>
          <img
            src={profilesImage}
            alt="User profiles"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
        </div>

        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-5 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col">
          <img
            src={msgImage}
            alt="Messages"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Anonymous Messages to Crush
            </h2>

            <p className="text-gray-600">
              Send anonymous messages directly to someone you like and break the
              ice without revealing your identity.
            </p>
          </div>
        </div>

        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex justify-between items-center space-x-3 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col-reverse">
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Looking for someone?
            </h2>

            <p className="text-gray-600">
              Find people easily using name, roll number, or college email ID.
            </p>
          </div>
          <img
            src={searchCrushImage}
            alt="Search"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
        </div>

        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-5 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col">
          <img
            src={notificationImage}
            alt="notification"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Mutual Crush Notification
            </h2>

            <p className="text-gray-600">
              When feelings match, both users receive notifications and can
              start chatting instantly.
            </p>
          </div>
        </div>
      </div>

      <div className="my-8 mt-20 text-center">
        <h3 className="text-2xl font-bold text-red-600">Important Note</h3>
        <p className="text-gray-600 mt-2">
          Pairly is built to encourage respectful interactions and meaningful
          connections.
        </p>
        <p className="text-gray-600 mt-2">
          Any misuse or abusive behavior can be reported at{" "}
          <a href="mailto:pairly.dev@gmail.com" className="text-blue-500">
            pairly.dev@gmail.com
          </a>{" "}
          with an image of the message.
        </p>
      </div>
    </div>
  );
};

export default HomeContainer;
