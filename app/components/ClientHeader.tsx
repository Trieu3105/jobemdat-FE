"use client";

import React from "react";
import { useHeaderContext } from "../context/headerContext";
import Header from "./header";

const ClientHeader = () => {
  const { showHeader } = useHeaderContext(); // Use HeaderContext

  if (!showHeader) return null; // Do not render Header if showHeader is false

  return <Header />;
};

export default ClientHeader;
