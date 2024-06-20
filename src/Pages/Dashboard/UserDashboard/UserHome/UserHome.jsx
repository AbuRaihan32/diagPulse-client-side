import useAuth from "../../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h3 className="text-4xl">Hello {user.displayName}</h3>
        </div>
    );
};

export default UserHome;