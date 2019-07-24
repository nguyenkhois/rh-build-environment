import React, { useState, useEffect } from 'react';
import { ScreenService } from '../../services/';

export default function ScreenInfo(props) {
    const placeholderClassName = props.placeholderClassName,
        componentClassName = props.componentClassName;

    const [viewportWidth, setViewportWidth] = useState(0),
        [viewportHeight, setViewportHeight] = useState(0);

    const [containerWidth, setContainerWidth] = useState(0),
        [containerHeight, setContainerHeight] = useState(0);

    const [componentWidth, setComponentWidth] = useState(0),
        [componentHeight, setComponentHeight] = useState(0);

    const rootFontSizeInPx = ScreenService.elementFontSize('html');

    useEffect(() => {
        function reportViewportSize() {
            const { width, height } = ScreenService.viewportSize() || {};
            setViewportWidth(width);
            setViewportHeight(height);
        }

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

        function getScreenInfo() {
            reportViewportSize();
            reportContainerSize();
            reportComponentSize();
        }

        getScreenInfo();
        window.addEventListener('resize', getScreenInfo);

        return () => {
            window.removeEventListener("resize", getScreenInfo);
        }
    }, []);

    return (
        <div className="app__detail-info">
            <details className="app__detail-info__container">
                <summary className="app__detail-info__title">Information</summary>
                <p>Device pixel ratio is <span className="app__detail-info__text-important">{ScreenService.devicePixelRatio()}</span></p>

                {viewportWidth && viewportHeight &&
                    <p>Viewport size: {viewportWidth} x {viewportHeight}px<br />
                        <span className="app__detail-info__text-notice">({ScreenService.pxToEm(viewportWidth)} x {ScreenService.pxToEm(viewportHeight)}em)</span></p>}

                {containerWidth > 0 && containerHeight > 0 &&
                    <p>Container size: {containerWidth} x {containerHeight}px<br />
                        <span className="app__detail-info__text-notice">({ScreenService.pxToEm(containerWidth)} x {ScreenService.pxToEm(containerHeight)}em)</span></p>}

                {componentWidth > 0 && componentHeight > 0 &&
                    <p>Component size: {componentWidth} x {componentHeight}px<br />
                        <span className="app__detail-info__text-notice">({ScreenService.pxToEm(componentWidth)} x {ScreenService.pxToEm(componentHeight)}em)</span></p>}

                {rootFontSizeInPx && <p>The root font-size is {rootFontSizeInPx}px
                    <span className="app__detail-info__text-notice"> ({ScreenService.pxToEm(rootFontSizeInPx)}em)</span></p>}
            </details>
        </div>
    );
}