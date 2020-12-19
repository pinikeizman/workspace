import * as React from 'react';
import * as cn from 'classnames';
import './index.sass'

export default ({ children, className, ...props }: React.PropsWithChildren<any>) => <div className={`col ${className || ''}`} {...props}>{children}</div>