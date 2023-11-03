import BackGround from '~/layouts/components/BackGround';

function Matching({ socket, onlineUsers }) {
    console.log(onlineUsers);
    return <BackGround isMatching />;
}

export default Matching;
