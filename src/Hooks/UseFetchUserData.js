import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

// /fetchUsers
export default function UseFetchUserData() {
  const authHeader = useAuthHeader();
  const auth = useAuthUser()
  console.log(authHeader)

  const fetchData = async (id) => {
    console.log( id);
    const res = await axios.get(
      `https://crabby-frog-swimsuit.cyclic.app/admin/${id}`,
      {
        headers: { _auth: authHeader },
      }
    );

    return res;
  };

  return useQuery({
    queryKey: ["fetchUser", auth?._id],
    queryFn: () => fetchData(auth?._id),
    enabled: !!auth?._id,
  });
}
