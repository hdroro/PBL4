import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const cx = classNames.bind(styles);

function Modal({ isShowing, hide, children }) {
    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className={cx('modal-wrapper')} aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div className={cx('modal')}>
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
