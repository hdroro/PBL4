import classNames from 'classnames/bind';
import styles from './Block.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Block({ children, hide }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
            <div className={cx('footer')}>
                <Button medium className={cx('btn-yes')}>
                    Yes
                </Button>
                <Button onClick={hide} medium className={cx('btn-no')}>
                    No
                </Button>
            </div>
        </div>
    );
}

export default Block;
