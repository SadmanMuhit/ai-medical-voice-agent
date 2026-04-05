"use client";

import Image from "next/image";
import { useState } from "react";
import AddNewSession from "./AddNewSession";
import React from "react";

const HistoryList = () => {
  const [HistoryList, setHistoryList] = useState([]);
  return (
    <div className="mt-10">
      {HistoryList.length === 0 ? (
        <div className="flex items-center flex-col justify-center p-7 border-dashed rounded-2xl border-2">
          <Image
            src="/medical-assistance.png"
            alt="empty"
            width={150}
            height={150}
          />
          <h2 className="font-bold text-xl mt-2">No Recent Consultation</h2>
          <p className="text-gray-500 text-center">
            It looks like you haven't consulted with any doctors yet.
          </p>

          <AddNewSession />
        </div>
      ) : (
        <div>List</div>
      )}
    </div>
  );
};

export default HistoryList;
