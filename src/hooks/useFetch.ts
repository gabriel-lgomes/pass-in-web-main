"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { UsersInterface } from "../interfaces/users";
import { newData } from "../interfaces/newData";

export default function useFetch(
  url: string,
  method?: string,
  newData?: newData
) {
  const [data, setData] = useState<UsersInterface[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (method === undefined) {
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          setData(response.data);
          setLoading(true); // Indica que a chamada está em andamento
        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setLoading(false); // Indica que a chamada foi concluída (com sucesso ou erro)
        }
      };

      fetchData();
    }

    if (method === "patch" && newData) {
      axios
        .patch(url, {
          name: newData?.name,
          email: newData?.email,
        })
        .then((response) => {
          setData(response.data);
          setLoading(true);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (method === "delete") {
      axios.delete(url);
    }
  }, [url, method, newData]);

  return { data, loading, error };
}
