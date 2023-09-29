import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import BackGround from '~/layouts/components/BackGround';

const cx = classNames.bind(styles);

function Home() {
    return <BackGround />;
}

export default Home;
