import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const cx = classNames.bind(styles);

function Modal({
    title,
    isShowing,
    hide,
    children,
    leftIcon = false,
    rightIcon = false,
    background,
    texttype,
    className,
    ...passProps
}) {
    const classes = cx('modal-wrapper', {
        [className]: className,
    });

    const classes_ = cx('modal', { background });
    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className={classes} aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div className={classes_}>
                          {!!title && (
                              <div className={cx('modal-header', { texttype })}>
                                  <h2 className={cx('header-title')}>
                                      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                                      <span className={cx('title')}>{title}</span>
                                      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
                                  </h2>
                              </div>
                          )}
                          <div className={cx('modal-content')}>
                              <div className={cx('wrapper')}>{children}</div>
                          </div>

                          <button
                              type="button"
                              className={cx('modal-close-button')}
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={hide}
                          >
                              <span aria-hidden="true">×</span>
                          </button>
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
}

export default Modal;
