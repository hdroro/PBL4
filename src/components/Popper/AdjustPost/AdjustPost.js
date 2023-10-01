import classNames from 'classnames/bind';
import styles from './AdjustPost.module.scss';
import Button from '~/components/Button';
import { Edit, Remove } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function AdjustPost() {
    return (
        <div className={cx('wrapper')}>
            <Button post leftIcon={<Edit />}>
                Edit post
            </Button>
            <Button post leftIcon={<Remove />}>
                Delete post
            </Button>
        </div>
    );
}

export default AdjustPost;
