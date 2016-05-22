import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "*": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    "*:after": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    "*:before": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    "self_clear:after": {
        "content": "",
        "clear": "both",
        "display": "table"
    },
    "fa": {
        "display": "inline-block",
        "font": "normal normal normal 14px/1 FontAwesome",
        "fontSize": "inherit",
        "textRendering": "auto",
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale"
    },
    "fa-eyedropper:before": {
        "content": "\\f1fb"
    },
    "fa-paint-brush:before": {
        "content": "\\f1fc"
    },
    "fa-eraser:before": {
        "content": "\\f12d"
    },
    "fa-trash-o:before": {
        "content": "\\f014"
    },
    "fa-files-o:before": {
        "content": "\\f0c5"
    },
    "fa-download:before": {
        "content": "\\f019"
    },
    "fa-twitter:before": {
        "content": "\\f099",
        "color": "#BBBBBB"
    },
    "fa-undo:before": {
        "content": "\\f0e2"
    },
    "fa-repeat:before": {
        "content": "\\f01e"
    },
    "fafa-eyedropper": {
        "textAlign": "center",
        "fontSize": 2,
        "color": "#313131",
        "paddingTop": "16%",
        "paddingRight": "16%",
        "paddingBottom": "16%",
        "paddingLeft": "16%",
        "marginTop": 0.5,
        "marginRight": 0,
        "marginBottom": 0.5,
        "marginLeft": 0
    },
    "fafa-paint-brush": {
        "textAlign": "center",
        "fontSize": 2,
        "color": "#313131",
        "paddingTop": "16%",
        "paddingRight": "16%",
        "paddingBottom": "16%",
        "paddingLeft": "16%",
        "marginTop": 0.5,
        "marginRight": 0,
        "marginBottom": 0.5,
        "marginLeft": 0
    },
    "fafa-eraser": {
        "textAlign": "center",
        "fontSize": 2,
        "color": "#313131",
        "paddingTop": "16%",
        "paddingRight": "16%",
        "paddingBottom": "16%",
        "paddingLeft": "16%",
        "marginTop": 0.5,
        "marginRight": 0,
        "marginBottom": 0.5,
        "marginLeft": 0
    },
    "[class*='col-']": {
        "float": "left",
        "paddingRight": 20
    },
    "[class*='col-']:last-of-type": {
        "paddingRight": 0
    },
    "col-2-3": {
        "width": "66.66%"
    },
    "col-1-3": {
        "width": "33.33%"
    },
    "col-1-2": {
        "width": "50%"
    },
    "col-1-4": {
        "width": "25%"
    },
    "col-3-4": {
        "width": "75%"
    },
    "col-6-8": {
        "width": "75%"
    },
    "col-1-8": {
        "width": "12.5%"
    },
    "col-7-8": {
        "width": "87.5%"
    },
    "grid:after": {
        "content": "",
        "display": "table",
        "clear": "both"
    },
    "grid-pad": {
        "paddingTop": 1,
        "paddingRight": 0.5,
        "paddingBottom": 1,
        "paddingLeft": 0.5
    },
    "grid-pad > [class*='col-']:last-of-type": {
        "paddingRight": 20
    },
    "html": {
        "backgroundColor": "#585858",
        "fontFamily": "'silkscreen_expandednormal'",
        "height": "100%"
    },
    "body": {
        "height": "100%",
        "width": "90%",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "input[type=\"text\"]": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontFamily": "sans-serif",
        "appearance": "none",
        "boxShadow": "inset 0 0 0 1px #707070",
        "borderRadius": "none",
        "textAlign": "center",
        "fontSize": 2,
        "color": "#BBBBBB",
        "backgroundColor": "#313131",
        "width": "50%",
        "paddingTop": 10,
        "paddingRight": 0,
        "paddingBottom": 10,
        "paddingLeft": 0,
        "border": "solid 5px #757575",
        "transition": "box-shadow 0.3s, border 0.3s"
    },
    "input[type=\"text\"]:focus": {
        "outline": "none",
        "border": "solid 5px #969696"
    },
    "input[type=\"text\"]focus": {
        "border": "solid 5px #969696"
    },
    "multiply-symbol": {
        "textAlign": "center",
        "fontSize": 4,
        "color": "#313131"
    },
    "button": {
        "border": 0,
        "background": "#5786c1",
        "color": "#BBBBBB",
        "paddingTop": 8,
        "paddingRight": 14,
        "paddingBottom": 8,
        "paddingLeft": 14,
        "fontWeight": "bold",
        "fontSize": 18,
        "fontFamily": "'silkscreen_expandednormal'",
        "textDecoration": "none",
        "display": "inline-block",
        "position": "relative",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f, 5px 4px #4171ae, 4px 5px #3a587f, 6px 5px #4171ae, 5px 6px #3a587f"
    },
    "input[type=submit]": {
        "border": 0,
        "background": "#5786c1",
        "color": "#BBBBBB",
        "paddingTop": 8,
        "paddingRight": 14,
        "paddingBottom": 8,
        "paddingLeft": 14,
        "fontWeight": "bold",
        "fontSize": 18,
        "fontFamily": "'silkscreen_expandednormal'",
        "textDecoration": "none",
        "display": "inline-block",
        "position": "relative",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f, 5px 4px #4171ae, 4px 5px #3a587f, 6px 5px #4171ae, 5px 6px #3a587f"
    },
    "button:hover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "button:focus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "buttonhover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "buttonfocus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "input[type=submit]:hover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "input[type=submit]:focus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "input[type=submit]hover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "input[type=submit]focus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f, 3px 2px #4171ae, 2px 3px #3a587f, 4px 3px #4171ae, 3px 4px #3a587f"
    },
    "button:active": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f"
    },
    "buttonactive": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f"
    },
    "input[type=submit]:active": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f"
    },
    "input[type=submit]active": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #4171ae, 0px 1px #3a587f, 2px 1px #4171ae, 1px 2px #3a587f"
    },
    "buttonred": {
        "background": "#961818",
        "boxShadow": "1px 0px #6B1010, 0px 1px #741515, 2px 1px #6B1010, 1px 2px #741515, 3px 2px #6B1010, 2px 3px #741515, 4px 3px #6B1010, 3px 4px #741515, 5px 4px #6B1010, 4px 5px #741515, 6px 5px #6B1010, 5px 6px #741515",
        "marginTop": 0
    },
    "buttonred:hover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #6B1010, 0px 1px #741515, 2px 1px #6B1010, 1px 2px #741515, 3px 2px #6B1010, 2px 3px #741515, 4px 3px #6B1010, 3px 4px #741515"
    },
    "buttonred:focus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #6B1010, 0px 1px #741515, 2px 1px #6B1010, 1px 2px #741515, 3px 2px #6B1010, 2px 3px #741515, 4px 3px #6B1010, 3px 4px #741515"
    },
    "buttonredhover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #6B1010, 0px 1px #741515, 2px 1px #6B1010, 1px 2px #741515, 3px 2px #6B1010, 2px 3px #741515, 4px 3px #6B1010, 3px 4px #741515"
    },
    "buttonredfocus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #6B1010, 0px 1px #741515, 2px 1px #6B1010, 1px 2px #741515, 3px 2px #6B1010, 2px 3px #741515, 4px 3px #6B1010, 3px 4px #741515"
    },
    "buttonred:active": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #6B1010, 0px 1px #741515, 2px 1px #6B1010, 1px 2px #741515"
    },
    "buttonredactive": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #6B1010, 0px 1px #741515, 2px 1px #6B1010, 1px 2px #741515"
    },
    "buttongray": {
        "background": "#313131",
        "boxShadow": "1px 0px #676767, 0px 1px #515151, 2px 1px #676767, 1px 2px #515151, 3px 2px #676767, 2px 3px #515151, 4px 3px #676767, 3px 4px #515151, 5px 4px #676767, 4px 5px #515151, 6px 5px #676767, 5px 6px #515151",
        "marginTop": 0
    },
    "buttongray:hover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #676767, 0px 1px #515151, 2px 1px #676767, 1px 2px #515151, 3px 2px #676767, 2px 3px #515151, 4px 3px #676767, 3px 4px #515151"
    },
    "buttongray:focus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #676767, 0px 1px #515151, 2px 1px #676767, 1px 2px #515151, 3px 2px #676767, 2px 3px #515151, 4px 3px #676767, 3px 4px #515151"
    },
    "buttongrayhover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #676767, 0px 1px #515151, 2px 1px #676767, 1px 2px #515151, 3px 2px #676767, 2px 3px #515151, 4px 3px #676767, 3px 4px #515151"
    },
    "buttongrayfocus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #676767, 0px 1px #515151, 2px 1px #676767, 1px 2px #515151, 3px 2px #676767, 2px 3px #515151, 4px 3px #676767, 3px 4px #515151"
    },
    "buttongray:active": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #676767, 0px 1px #515151, 2px 1px #676767, 1px 2px #515151"
    },
    "buttongrayactive": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #676767, 0px 1px #515151, 2px 1px #676767, 1px 2px #515151"
    },
    "buttonbrown": {
        "background": "#803C3C",
        "boxShadow": "1px 0px #733939, 0px 1px #552A2A, 2px 1px #733939, 1px 2px #552A2A, 3px 2px #733939, 2px 3px #552A2A, 4px 3px #733939, 3px 4px #552A2A, 5px 4px #733939, 4px 5px #552A2A, 6px 5px #733939, 5px 6px #552A2A",
        "marginTop": 0
    },
    "buttonbrown:hover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #733939, 0px 1px #552A2A, 2px 1px #733939, 1px 2px #552A2A, 3px 2px #733939, 2px 3px #552A2A, 4px 3px #733939, 3px 4px #552A2A"
    },
    "buttonbrown:focus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #733939, 0px 1px #552A2A, 2px 1px #733939, 1px 2px #552A2A, 3px 2px #733939, 2px 3px #552A2A, 4px 3px #733939, 3px 4px #552A2A"
    },
    "buttonbrownhover": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #733939, 0px 1px #552A2A, 2px 1px #733939, 1px 2px #552A2A, 3px 2px #733939, 2px 3px #552A2A, 4px 3px #733939, 3px 4px #552A2A"
    },
    "buttonbrownfocus": {
        "transform": "translate(2px, 2px)",
        "boxShadow": "1px 0px #733939, 0px 1px #552A2A, 2px 1px #733939, 1px 2px #552A2A, 3px 2px #733939, 2px 3px #552A2A, 4px 3px #733939, 3px 4px #552A2A"
    },
    "buttonbrown:active": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #733939, 0px 1px #552A2A, 2px 1px #733939, 1px 2px #552A2A"
    },
    "buttonbrownactive": {
        "transform": "translate(4px, 4px)",
        "boxShadow": "1px 0px #733939, 0px 1px #552A2A, 2px 1px #733939, 1px 2px #552A2A"
    },
    "load-button-wrapper": {
        "width": "48%",
        "float": "left"
    },
    "save-button-wrapper": {
        "width": "48%",
        "float": "right"
    },
    "load-button-wrapper button": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "display": "table",
        "width": "100%"
    },
    "save-button-wrapper button": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "display": "table",
        "width": "100%"
    },
    "twitter-button-wrapper": {
        "textAlign": "center"
    },
    "h1": {
        "fontSize": 2
    },
    "h2": {
        "fontSize": 0.8,
        "paddingRight": 1,
        "display": "inline",
        "position": "relative",
        "top": -0.9
    },
    "h3": {
        "fontSize": 1
    },
    "header": {
        "paddingTop": 0,
        "paddingRight": 1.4,
        "paddingBottom": 0,
        "paddingLeft": 1.4,
        "color": "#BBBBBB"
    },
    "credits-wrapper": {
        "textAlign": "right",
        "marginTop": 1
    },
    "credits-wrapper a": {
        "textDecoration": "none",
        "color": "#B17E7E"
    },
    "color-tools-wrapper": {
        "textAlign": "center"
    },
    "tools-wrapper": {
        "textAlign": "center"
    },
    "load-save-container": {
        "marginBottom": 1.5
    },
    "react-cookie-banner": {
        "position": "relative",
        "backgroundColor": "#484848",
        "width": "100%",
        "zIndex": 0,
        "clear": "both",
        "display": "table",
        "paddingTop": 0.5,
        "paddingRight": 0.5,
        "paddingBottom": 0.5,
        "paddingLeft": 0.5,
        "fontSize": 0.9
    },
    "react-cookie-banner button-close": {
        "position": "relative",
        "lineHeight": 24,
        "opacity": 0.5,
        "backgroundColor": "white",
        "fontWeight": 500,
        "color": "#242424",
        "cursor": "pointer",
        "textAlign": "center",
        "paddingTop": 0.2,
        "paddingRight": 0.2,
        "paddingBottom": 0.2,
        "paddingLeft": 0.2,
        "marginTop": 0.5,
        "marginRight": "auto",
        "marginBottom": 0.5,
        "marginLeft": "auto",
        "width": 11
    },
    "react-cookie-banner cookie-message": {
        "fontWeight": 500,
        "color": "#F0F0F0",
        "textAlign": "left",
        "position": "relative",
        "display": "block"
    },
    "simple-notification-enter": {
        "opacity": 0.01
    },
    "simple-notification-entersimple-notification-enter-active": {
        "opacity": 1,
        "transition": "opacity 1000ms ease-in"
    },
    "simple-notification-leave": {
        "opacity": 1
    },
    "simple-notification-leavesimple-notification-leave-active": {
        "opacity": 0.01,
        "transition": "opacity 1000ms ease-out"
    }
});