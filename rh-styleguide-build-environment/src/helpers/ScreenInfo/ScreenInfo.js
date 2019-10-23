import React, { useState, useEffect } from 'react';
import { ScreenService } from '../../services/';

export default function ScreenInfo() {

    const [viewportWidth, setViewportWidth] = useState(0),
        [viewportHeight, setViewportHeight] = useState(0);

    const rootFontSizeInPx = ScreenService.elementFontSize('html');

    useEffect(() => {
        function reportViewportSize() {
            const { width, height } = ScreenService.viewportSize() || {};
            setViewportWidth(width);
            setViewportHeight(height);
        }

        reportViewportSize();
        window.addEventListener('resize', reportViewportSize);

        return () => {
            window.removeEventListener("resize", reportViewportSize);
        };
    }, []);

    return (
        <div className="app__detail-info">
            <details className="app__detail-info__container">
                <summary className="app__detail-info__title">Screen info</summary>
                <p>Device pixel ratio is <span className="app__detail-info__text-important">{ScreenService.devicePixelRatio()}</span></p>

                {viewportWidth && viewportHeight &&
                    <p>Viewport size: {viewportWidth} x {viewportHeight}px<br />
                        <span className="app__detail-info__text-notice">({ScreenService.pxToEm(viewportWidth)} x {ScreenService.pxToEm(viewportHeight)}em)</span></p>}

                {rootFontSizeInPx && <p>The root font-size is {rootFontSizeInPx}px
                    <span className="app__detail-info__text-notice"> ({ScreenService.pxToEm(rootFontSizeInPx)}em)</span></p>}
            </details>
        </div>
    );
}