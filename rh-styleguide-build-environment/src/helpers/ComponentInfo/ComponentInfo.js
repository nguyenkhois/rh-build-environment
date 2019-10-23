import React, { useState, useEffect } from 'react';
import { ScreenService } from '../../services/';

export default function ComponentInfo(props) {

    const [containerWidth, setContainerWidth] = useState(0),
        [containerHeight, setContainerHeight] = useState(0);

    const [componentWidth, setComponentWidth] = useState(0),
        [componentHeight, setComponentHeight] = useState(0);

    const { placeholderClassName, componentClassName } = props;

    useEffect(() => {
        function reportContainerSize() {
            if (placeholderClassName) {
                const { width, height } = ScreenService.elementSizeByClassName(placeholderClassName) || {};
                setContainerWidth(width);
                setContainerHeight(height);
            }
        }

        function reportComponentSize() {
            if (componentClassName) {
                const { width, height } = ScreenService.elementSizeByClassName(componentClassName) || {};
                setComponentWidth(width);
                setComponentHeight(height);
            }
        }

        function reportComponentInfo() {
            reportContainerSize();
            reportComponentSize();
        }

        reportComponentInfo();
        window.addEventListener('resize', reportComponentInfo);

        return () => {
            window.removeEventListener("resize", reportComponentInfo);
        };

    }, []);

    return (
        <div className="app__detail-info">
            <details className="app__detail-info__container">
                <summary className="app__detail-info__title">Component info</summary>

                {containerWidth > 0 && containerHeight > 0 &&
                    <p>Container size: {containerWidth} x {containerHeight}px<br />
                        <span className="app__detail-info__text-notice">({ScreenService.pxToEm(containerWidth)} x {ScreenService.pxToEm(containerHeight)}em)</span></p>}

                {componentWidth > 0 && componentHeight > 0 &&
                    <p>Component size: {componentWidth} x {componentHeight}px<br />
                        <span className="app__detail-info__text-notice">({ScreenService.pxToEm(componentWidth)} x {ScreenService.pxToEm(componentHeight)}em)</span></p>}

            </details>
        </div>
    );
}