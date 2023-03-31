import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const api = (url, method = "GET", payload) => {
  fetch(`${process.env.BACKEND_URI}${url}`, { method });
};

export function useSignIn(payload) {
  fetch(`${process.env.BACKEND_URI}`);
}
