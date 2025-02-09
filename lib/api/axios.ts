"use client";
import axios from "axios";
import { getBaseUrl } from "./const/urls";

export const axiosClient = axios.create({
  baseURL: getBaseUrl(),
});
