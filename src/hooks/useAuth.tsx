const useAuth = () => {
  const jwt = localStorage.getItem("jwt");
  let username = localStorage.getItem("username");

  username = username && username !== null ? JSON.parse(username) : username;
  return {
    status: jwt ? true : false,
    username,
  };
};

export default useAuth;
