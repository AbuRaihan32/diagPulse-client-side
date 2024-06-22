import useAuth from "../../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:border rounded-2xl h-[calc(100vh-30vh)] mt-10">
      <div className="md:w-1/2 md:pl-10">
        <h1 className="text-4xl my-5">Hello {user.displayName}!</h1>
        <p>
          Welcome to DiagPulse. Please read and understand our services
          carefully before booking. And if you have any complaint then submit it
          in feedback option.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="w-[300px] h-[300px] bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] rounded-2xl flex items-center justify-center">
          <div className="avatar">
            <div className="w-40 rounded-full">
              <img src={user.photoURL} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
