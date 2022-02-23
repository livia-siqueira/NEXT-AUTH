import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import { parseCookies } from "nookies";
import { getAPIClient } from "../services/axios";

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
   
  }, []);

  return (
    <>
      <header>Dashboard</header>
      <img src={user?.avatar_url} />
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
    const { ["nextauth.token"]: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  await apiClient.get('/users')
  return {
    props: {},
  };
};
