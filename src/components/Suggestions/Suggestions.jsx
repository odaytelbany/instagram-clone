"use client";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const data = [...Array(4)].map((_, i) => ({
      userId: i,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarLegacy(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(data);
  }, []);

  return (
    <div className="ml-10 w-full mt-6">
      <div className="flex justify-between">
        <h2 className="text-sm">Suggestions for you</h2>
        <h2 className="text-sm font-bold">See All</h2>
      </div>
      <div>
        {suggestions.map((item) => (
          <div className="flex items-center w-full mt-8">
            <img
              className="rounded-full h-12 w-12 p-[0.5px] border mr-3"
              src={item.avatar}
              alt=""
            />
            <div className="flex-1">
              <h2 className="font-semibold truncate">{item.username}</h2>
              <h3 className="text-xs text-gray-500">welcome to instagram</h3>
            </div>
            <button className="text-xs font-semibold cursor-pointer text-blue-400">
              Sign Out
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
