/*
 * Copyright 2020 Oleg Shulyakov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const themeUIConfig = {
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: "inherit",
        monospace: "Menlo, monospace",
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125,
    },
    colors: {
        text: "#000",
        background: "#F7F7F7",
        primary: "#07c",
        secondary: "#30c",
        muted: "#f6f6f6",
    },
    text: {
        caps: {
            textTransform: "uppercase",
            letterSpacing: "0.2em",
        },
        heading: {
            fontFamily: "heading",
            fontWeight: "heading",
            lineHeight: "heading",
        },
    },
    styles: {
        root: {
            fontFamily: "body",
            lineHeight: "body",
            fontWeight: "body",
        },
        h1: {
            color: "text",
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
            fontSize: 5,
        },
        h2: {
            color: "text",
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
            fontSize: 4,
        },
        h3: {
            color: "text",
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
            fontSize: 3,
        },
        h4: {
            color: "text",
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
            fontSize: 2,
        },
        h5: {
            color: "text",
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
            fontSize: 1,
        },
        h6: {
            color: "text",
            fontFamily: "heading",
            lineHeight: "heading",
            fontWeight: "heading",
            fontSize: 0,
        },
        p: {
            color: "text",
            fontFamily: "body",
            fontWeight: "body",
            lineHeight: "body",
        },
        a: {
            color: "primary",
        },
        pre: {
            fontFamily: "monospace",
            overflowX: "auto",
            code: {
                color: "inherit",
            },
        },
        code: {
            fontFamily: "monospace",
            fontSize: "inherit",
        },
        table: {
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
        },
        th: {
            textAlign: "left",
            borderBottomStyle: "solid",
        },
        td: {
            textAlign: "left",
            borderBottomStyle: "solid",
        },
        img: {
            maxWidth: "100%",
        },
    },
};

export default themeUIConfig;
