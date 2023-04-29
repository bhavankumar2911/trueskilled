import { useRouter } from "next/router";

const useCurrentUserID = () => useRouter().query["id"];

export default useCurrentUserID;
