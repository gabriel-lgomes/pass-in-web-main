"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { UsersInterface } from "../interfaces/users";

export default function useFetch(url: string) {
  const [data, setData] = useState<UsersInterface[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Indica que a chamada está em andamento
        const response = await axios(url);
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false); // Indica que a chamada foi concluída (com sucesso ou erro)
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
